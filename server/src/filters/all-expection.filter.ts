/**
 * @Description: 异常过滤器
 * @Author: OceanH
 * @Date: 2023-08-30 16:52:27
 */
import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as moment from 'moment';

// 负责捕获HttpException类的实例
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // 用于接收主动报错的错误信息
    const { message, code } = exception.getResponse() as any;
    response.status(status).json({
      code: code || status,
      path: request.url,
      err: 'Bad Request',
      message,
      timeStamp: moment().format('yyyy-MM-DD HH:mm:ss'),
    });
  }
}
