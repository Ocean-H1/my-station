/**
 * @Description: 统一成响应数据格式
 * @Author: OceanH
 * @Date: 2023-08-30 16:26:26
 */
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformInterceptors implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        return {
          code: 10000,
          data,
          message: 'success',
        };
      }),
    );
  }
}
