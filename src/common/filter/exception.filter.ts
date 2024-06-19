/*
 * @Description: 
 * @version: v1.0.0
 * @Author: ladd
 * @Date: 2024-06-17 09:44:15
 * @LastEditors: ladd
 * @LastEditTime: 2024-06-17 17:59:48
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express'
import * as moment from 'moment'

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    const status = exception.getStatus();
    const { message } = exception.getResponse() as any;
    response.status(status).json({
      code: status || HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      timestamp: moment().format('yyyy-MM-DD HH:mm:ss'),
      path: request.originalUrl,
    });
  }
}
