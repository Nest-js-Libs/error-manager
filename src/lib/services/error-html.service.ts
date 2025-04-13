import { Injectable } from '@nestjs/common';

/**
 * Servicio para generar páginas HTML para los tipos de error según RFC 7807
 */
@Injectable()
export class ErrorHtmlService {
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
    const descriptions: Record<string, string> = {
      unauthorized:
        'No tienes los permisos necesarios para acceder a este recurso. Verifica tus credenciales e intenta nuevamente.',
      forbidden: 'Tu usuario no tiene permiso para realizar esta acción.',
      notfound: 'El recurso solicitado no existe o ha sido eliminado.',
      badrequest:
        'La solicitud contiene parámetros inválidos o le faltan campos requeridos.',
      internalservererror:
        'Ha ocurrido un error inesperado en el servidor. Nuestro equipo ha sido notificado y estamos trabajando para resolverlo.',
      serviceunavailable:
        'El servicio no está disponible temporalmente. Por favor, intenta nuevamente más tarde.',
      unhandlederror:
        'Ha ocurrido un error inesperado. Por favor, contacta al equipo de soporte si el problema persiste.',
    };

    return (
      descriptions[errorType] ||
      'Error en la aplicación. Contacta al equipo de soporte si el problema persiste.'
    );
  }

  /**
   * Genera una lista de posibles soluciones para un tipo de error
   */
  private getPossibleSolutions(errorType: string): string {
    const solutions: Record<string, string[]> = {
      unauthorized: [
        'Verifica que estás utilizando credenciales válidas',
        'Asegúrate de que tu token de autenticación no ha expirado',
        'Comprueba que estás incluyendo el encabezado de autorización correctamente',
      ],
      forbidden: [
        'Contacta al administrador para solicitar los permisos necesarios',
        'Verifica que tu cuenta tiene el rol adecuado para esta operación',
      ],
      notfound: [
        'Verifica que el ID o la ruta del recurso sea correcta',
        'Comprueba si el recurso ha sido eliminado o movido',
      ],
      badrequest: [
        'Revisa la documentación de la API para entender los parámetros requeridos',
        'Verifica el formato de los datos enviados',
        'Asegúrate de que todos los campos obligatorios estén incluidos',
      ],
      internalservererror: [
        'Intenta nuevamente más tarde',
        'Reporta el error al equipo de soporte incluyendo el traceId',
      ],
      serviceunavailable: [
        'Intenta nuevamente después de unos minutos',
        'Verifica el estado del servicio en la página de estado',
      ],
    };

    const errorSolutions = solutions[errorType] || [
      'Contacta al equipo de soporte proporcionando el traceId',
      'Verifica la documentación de la API para más información',
    ];

    return errorSolutions
      .map(solution => `<li>${solution}</li>`)
      .join('\n    ');
  }
}
