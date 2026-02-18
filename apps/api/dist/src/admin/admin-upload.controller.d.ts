import { Request } from 'express';
export declare class AdminUploadController {
    upload(file: Express.Multer.File | undefined, req: Request): Promise<{
        url: string;
    }>;
}
