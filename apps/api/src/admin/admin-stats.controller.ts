import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { AdminStatsService } from './admin-stats.service';

@Controller('admin/stats')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminStatsController {
  constructor(private readonly stats: AdminStatsService) {}

  @Get('dashboard')
  getDashboard(@Query('days') days?: string) {
    const d = days ? Math.min(365, Math.max(7, parseInt(days, 10) || 30)) : 30;
    return this.stats.getDashboard(d);
  }
}
