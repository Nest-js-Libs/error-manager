import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { ErrorHtmlService } from './services/error-html.service';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

/**
 * Controlador para servir la documentación HTML de los errores
 */
@ApiTags('Error Documentation')
@Controller('errors')
export class ErrorDocumentationController {
  constructor(private readonly errorHtmlService: ErrorHtmlService) {}

  /**
   * Devuelve la página HTML de documentación para un tipo de error específico
   */
  @Get(':errorType')
  @ApiOperation({ summary: 'Obtener documentación HTML para un tipo de error' })
  @ApiParam({ name: 'errorType', description: 'Tipo de error a documentar' })
  @ApiResponse({
    status: 200,
    description: 'Página HTML de documentación del error',
  })
  @ApiResponse({ status: 404, description: 'Tipo de error no encontrado' })
  getErrorDocumentation(
    @Param('errorType') errorType: string,
    @Res() res: Response,
  ): void {
    const htmlContent = this.errorHtmlService.generateErrorHtml(errorType);

    res.type('text/html').send(htmlContent);
  }
}
