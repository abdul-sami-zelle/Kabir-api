import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    return next.handle().pipe(
      map((response) => {
        // If response is already formatted, return as-is
        if (response?.success !== undefined) {
          return response;
        }

        return {
          success: true,
          data: response,
        };
      }),
    );
  }
}
