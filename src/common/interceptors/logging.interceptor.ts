import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, tap } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const requestId = randomUUID();
    const { method, originalUrl, ip, body } = request;
    const userAgent = request.get('user-agent') || '';
    const startTime = Date.now();

    const sanitizedBody = this.sanitizeBody(body);

    this.logger.info('Incoming Request', {
      requestId,
      method,
      url: originalUrl,
      ip,
      userAgent,
      body: sanitizedBody,
    });

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.info('Response', {
            requestId,
            method,
            url: originalUrl,
            statusCode: response.statusCode,
            duration: `${duration}ms`,
          });
        },
        error: (error: Error) => {
          const duration = Date.now() - startTime;
          this.logger.error('Request Failed', {
            requestId,
            method,
            url: originalUrl,
            statusCode: response.statusCode,
            duration: `${duration}ms`,
            error: error.message,
            stack: error.stack,
          });
        },
      }),
    );
  }

  private sanitizeBody(body: Record<string, unknown>): Record<string, unknown> {
    if (!body || typeof body !== 'object') return body;

    const sensitiveFields = [
      'password',
      'token',
      'accessToken',
      'refreshToken',
      'secret',
      'code',
    ];
    const sanitized = { ...body };

    for (const field of sensitiveFields) {
      if (field in sanitized) {
        sanitized[field] = '***';
      }
    }

    return sanitized;
  }
}
