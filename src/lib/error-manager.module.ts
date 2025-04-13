import { Global, Module } from '@nestjs/common';
import { ErrorManagerFilter } from './filters/error-manager.filter';
import { TraceIdService } from './services/trace-id.service';
import { ErrorHtmlService } from './services/error-html.service';
import { ConfigModule } from '@nestjs/config';
import { ErrorDocumentationController } from 'src/lib/error-documentation.controller';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [ErrorDocumentationController],
  providers: [
    ErrorManagerFilter,
    TraceIdService,
    ErrorHtmlService,
    {
      provide: 'APP_FILTER',
      useClass: ErrorManagerFilter,
    },
  ],
  exports: [ErrorManagerFilter, TraceIdService, ErrorHtmlService],
})
export class ErrorManagerModule {}
