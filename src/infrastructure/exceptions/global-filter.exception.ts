import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InvalidStockException } from './invalid-stock.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      error instanceof HttpException
        ? error.getStatus()
        : error instanceof InvalidStockException
        ? error.statusCode
        : 500;

    res.status(status).json({
      statusCode: status,
      message: error.message || 'Internal server error',
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
