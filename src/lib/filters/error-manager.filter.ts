import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';
import { ProblemDetails } from '../types/problem-details';
import { TraceIdService } from '../services/trace-id.service';
import { ConfigService } from '@nestjs/config';

@Catch()
export class ErrorManagerFilter implements ExceptionFilter {
  private readonly logger = new Logger(ErrorManagerFilter.name);
  private readonly baseUrl: string;

  constructor(
    private readonly traceIdService: TraceIdService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    // Obtener la URL base de la configuración o usar un valor predeterminado
    this.baseUrl = this.configService.get<string>('API_BASE_URL') || '0.0.0.0:' + this.configService.get<string>('PORT');
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception.message || 'Internal server error';
    const errorType = exception.errorType || 'UnhandledError';
    
    // Generar un traceId significativo usando el servicio
    const traceId = this.traceIdService.generateTraceId(errorType);
    
    // Crear la URL para la documentación HTML del error
    const errorTypeNormalized = errorType.toLowerCase();
    
    const problemDetails: ProblemDetails = {
      // La URL ahora apunta a la documentación HTML del error
      type: `${this.baseUrl}/api/errors/${errorTypeNormalized}`,
      title: message,
      status,
      detail: exception.description || message,
      instance: request.url,
      timestamp: new Date().toISOString(),
      traceId: traceId,
      // Añadir campos adicionales si están disponibles
      errors: exception.errors || undefined
    };

    this.logger.error(JSON.stringify(problemDetails));

    response
      .status(status)
      .type('application/problem+json')
      .send(problemDetails);
  }
}
