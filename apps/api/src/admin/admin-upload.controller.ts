import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

const ALLOWED_EXT = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
const UPLOAD_DIR = process.env.UPLOAD_DIR ?? path.join(process.cwd(), 'uploads');

@Controller('admin/upload')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminUploadController {
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File | undefined,
    @Req() req: Request,
  ) {
    if (!file?.buffer) {
      throw new BadRequestException('No file provided');
    }
    const extMatch = file.originalname?.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0].toLowerCase() : '';
    if (ext && !ALLOWED_EXT.includes(ext)) {
      throw new BadRequestException('Unsupported file type');
    }
    await mkdir(UPLOAD_DIR, { recursive: true });
    const hash = crypto.randomBytes(8).toString('hex');
    const safeName =
      (file.originalname ?? 'image')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-') || 'image';
    const filename = `${safeName}-${hash}${ext || '.jpg'}`;
    const filepath = path.join(UPLOAD_DIR, filename);
    await writeFile(filepath, file.buffer);
    const base = process.env.API_PUBLIC_URL ?? `${req.protocol}://${req.get('host')}`;
    const url = `${base.replace(/\/$/, '')}/uploads/${filename}`;
    return { url };
  }
}
