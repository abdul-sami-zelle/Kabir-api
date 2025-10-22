import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class FileUploadInterceptor implements NestInterceptor {
    private upload;
    constructor(fieldName?: string);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
