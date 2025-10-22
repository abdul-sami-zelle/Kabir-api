import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Injectable()
export class UploadMiddleware implements NestMiddleware {
    private upload: any;

    constructor() {
        this.upload = multer({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb: (error: any, acceptFile: boolean) => void) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'), false); // ✅ plain Error
                }
                cb(null, true);
            },

            limits: { fileSize: 3 * 1024 * 1024 }, // 3 MB max
        }).single('profile'); // Field name (customize if needed)
    }

    use(req: Request, res: Response, next: NextFunction) {
        this.upload(req, res, (err: any) => {
            if (err) {
                throw new BadRequestException(err.message);
            }
            next();
        });
    }
}
