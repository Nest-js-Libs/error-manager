import { Inject, Injectable } from '@nestjs/common';
import { DESCRIPTIONS_ERROR, SOLUTIONS_ERRORS } from '../constants';

/**
 * Servicio para generar páginas HTML para los tipos de error según RFC 7807
 */
@Injectable()
export class ErrorHtmlService {

  constructor(
    @Inject('ERROR_CONFIG') private readonly errorConfig: {
      descriptions: Record<string, string>;
      solutions: Record<string, string[]>;
    }
  ) {}

  /**
   * Genera una página HTML para un tipo de error específico
   * @param errorType Tipo de error
   * @param errorDescription Descripción detallada del error
   * @returns Contenido HTML para la página de documentación del error
   */
  generateErrorHtml(errorType: string, errorDescription?: string): string {
    const normalizedType = errorType.toLowerCase();
    const title = this.formatErrorTypeToTitle(normalizedType);
    const description =
      errorDescription || this.getDefaultDescription(normalizedType);

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Error: ${title}</title>
    <style>
        body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        }
        h1 {
        color: #e53935;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        }
        h2 {
        color: #424242;
        margin-top: 30px;
        }
        .error-box {
        background-color: #f5f5f5;
        border-left: 4px solid #e53935;
        padding: 15px;
        margin: 20px 0;
        border-radius: 0 4px 4px 0;
        }
        code {
        background-color: #f1f1f1;
        padding: 2px 5px;
        border-radius: 3px;
        font-family: monospace;
        }
        .example {
        background-color: #f8f9fa;
        padding: 15px;
        border-radius: 4px;
        overflow-x: auto;
        }
    </style>
    </head>
    <body>
    <h1>Error: ${title}</h1>
    
    <div class="error-box">
        <p><strong>Tipo:</strong> ${normalizedType}</p>
    </div>
    
    <h2>Descripción</h2>
    <p>${description}</p>
    
    <h2>Formato de respuesta</h2>
    <p>Este error sigue el estándar <a href="https://datatracker.ietf.org/doc/html/rfc7807" target="_blank">RFC 7807 Problem Details</a> y devuelve una respuesta con el siguiente formato:</p>
    
    <pre class="example">{
    "type": "https://api.example.com/errors/${normalizedType}",
    "title": "${title}",
    "status": [código HTTP correspondiente],
    "detail": "Descripción detallada del error",
    "instance": "/ruta/donde/ocurrió/el/error",
    "timestamp": "2023-07-21T15:30:45.123Z",
    "traceId": "${normalizedType}-uuid"
}</pre>
    
    <h2>Posibles soluciones</h2>
    <ul>
        ${this.getPossibleSolutions(normalizedType)}
    </ul>
    
    <h2>Información adicional</h2>
    <p>Si necesitas más ayuda con este error, contacta al equipo de soporte proporcionando el <code>traceId</code> incluido en la respuesta.</p>
    </body>
    </html>
`;
  }

  /**
   * Convierte un tipo de error normalizado a un título legible
   */
  private formatErrorTypeToTitle(errorType: string): string {
    // Convierte 'unauthorized_access' a 'Unauthorized Access'
    return errorType
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Obtiene una descripción predeterminada para tipos de error comunes
   */
  private getDefaultDescription(errorType: string): string {
    return (
      this.errorConfig.descriptions[errorType] ||
      'Error en la aplicación. Contacta al equipo de soporte si el problema persiste.'
    );
  }

  /**
   * Genera una lista de posibles soluciones para un tipo de error
   */
  private getPossibleSolutions(errorType: string): string {
    const errorSolutions = this.errorConfig.solutions[errorType] || [
      'Contacta al equipo de soporte proporcionando el traceId',
      'Verifica la documentación de la API para más información',
    ];

    return errorSolutions
      .map(solution => `<li>${solution}</li>`)
      .join('\n    ');
  }
}
