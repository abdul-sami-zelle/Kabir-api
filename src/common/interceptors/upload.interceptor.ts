import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import multer from 'multer';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { Request } from 'express';
import { of } from 'rxjs';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
    private upload: any;

    constructor(fieldName: string = 'profile') {
        this.upload = multer({
            storage: diskStorage({
                destination: (req, file, cb) => {
                    cb(null, './uploads');
                },
                filename: (req, file, cb) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
                },
            }),
            fileFilter: (req, file, cb: (error: any, acceptFile: boolean) => void) => {
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('Only image files are allowed!'), false); // ✅ plain Error
                }
                cb(null, true);
            },

            limits: { fileSize: 3 * 1024 * 1024 },
        }).single(fieldName);
    }

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest<Request>();

        return new Observable((observer) => {
            this.upload(req, req.res, (err: any) => {
                if (err) observer.error(new BadRequestException(err.message));
                else observer.next(next.handle());
            });
        });
    }
}
