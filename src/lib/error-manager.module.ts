import { Global, Module, DynamicModule } from '@nestjs/common';
import { ErrorManagerFilter } from './filters/error-manager.filter';
import { TraceIdService } from './services/trace-id.service';
import { ErrorHtmlService } from './services/error-html.service';
import { ConfigModule } from '@nestjs/config';
import { ErrorDocumentationController } from './error-documentation.controller';
import { DESCRIPTIONS_ERROR, SOLUTIONS_ERRORS } from './constants';

export interface ErrorManagerOptions {
  descriptions?: Record<string, string>;
  solutions?: Record<string, string[]>;
}

@Global()
@Module({})
export class ErrorManagerModule {
  static forRoot(options?: ErrorManagerOptions): DynamicModule {
    const descriptions = options?.descriptions || DESCRIPTIONS_ERROR;
    const solutions = options?.solutions || SOLUTIONS_ERRORS;

    return {
      module: ErrorManagerModule,
      imports: [ConfigModule.forRoot()],
      controllers: [ErrorDocumentationController],
      providers: [
        ErrorManagerFilter,
        TraceIdService,
        ErrorHtmlService,
        {
          provide: 'ERROR_CONFIG',
          useValue: { descriptions, solutions },
        },
        {
          provide: 'APP_FILTER',
          useClass: ErrorManagerFilter,
        },
      ],
      exports: [ErrorManagerFilter, TraceIdService, ErrorHtmlService, 'ERROR_CONFIG'],
    };
  }
}