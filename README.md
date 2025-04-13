# Módulo Error Manager

# @nest-js/error-manager

[![npm version](https://img.shields.io/npm/v/@nest-js/error-manager.svg)](https://www.npmjs.com/package/@nest-js/error-manager)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


El módulo Error Manager implementa el estándar [RFC 7807 Problem Details](https://datatracker.ietf.org/doc/html/rfc7807) para el manejo uniforme de errores en APIs HTTP. Este estándar proporciona una forma estructurada y consistente de devolver información de error a los clientes, facilitando el diagnóstico y la resolución de problemas.

## Características principales

- Implementación completa del estándar RFC 7807 Problem Details
- Generación automática de IDs de rastreo (traceId) para cada error
- Páginas HTML de documentación para cada tipo de error
- Filtro global para capturar y transformar todas las excepciones
- Integración con el sistema de logging


## Formato de respuesta

Las respuestas de error siguen esta estructura según el estándar RFC 7807:

```json
{
  "type": "https://api.example.com/errors/unauthorized",
  "title": "Unauthorized Access",
  "status": 401,
  "detail": "No tienes los permisos necesarios para acceder a este recurso",
  "instance": "/api/protected-resource",
  "timestamp": "2023-07-21T15:30:45.123Z",
  "traceId": "unauthorized-550e8400-e29b-41d4-a716-446655440000",
  "errors": []
}
```

### Campos

- **type**: URI que identifica el tipo de problema y apunta a la documentación HTML
- **title**: Resumen breve y legible del problema
- **status**: Código de estado HTTP
- **detail**: Explicación detallada del problema
- **instance**: URI que identifica la instancia específica del problema
- **timestamp**: Marca de tiempo cuando ocurrió el error
- **traceId**: Identificador único de rastreo para el error
- **errors**: Detalles adicionales sobre errores específicos (ej. errores de validación)

## Uso

### Importación del módulo

El módulo está marcado como `@Global()`, por lo que solo necesitas importarlo una vez en el módulo raíz de tu aplicación:

```typescript
import { ErrorManagerModule } from './app/error-manager/error-manager.module';

@Module({
  imports: [ErrorManagerModule],
})
export class AppModule {}
```

### Lanzar excepciones personalizadas

Puedes lanzar excepciones con información adicional para el filtro:

```typescript
throw {
  status: HttpStatus.BAD_REQUEST,
  message: 'Datos de entrada inválidos',
  errorType: 'ValidationError',
  description: 'Los datos proporcionados no cumplen con las validaciones',
  errors: [
    { field: 'email', message: 'Debe ser un email válido' },
    { field: 'password', message: 'Debe tener al menos 8 caracteres' }
  ]
};
```

### Acceder a la documentación de errores

La documentación HTML para cada tipo de error está disponible en:

```
GET /errors/:errorType
```

Por ejemplo: `/errors/unauthorized` mostrará la documentación para errores de tipo "unauthorized".

## Personalización

### Añadir nuevos tipos de errores

Para añadir documentación para nuevos tipos de errores, puedes extender el método `getDefaultDescription` en `ErrorHtmlService`:

```typescript
private getDefaultDescription(errorType: string): string {
  const descriptions: Record<string, string> = {
    // Tipos existentes...
    'custom_error_type': 'Descripción detallada del error personalizado',
  };

  return descriptions[errorType] || 'Error en la aplicación...';
}
```

Y también añadir soluciones personalizadas en `getPossibleSolutions`:

```typescript
private getPossibleSolutions(errorType: string): string {
  const solutions: Record<string, string[]> = {
    // Soluciones existentes...
    'custom_error_type': [
      'Primera posible solución',
      'Segunda posible solución'
    ],
  };
  // ...
}
```

## Beneficios

- **Consistencia**: Todas las respuestas de error siguen el mismo formato
- **Trazabilidad**: Cada error tiene un ID único para facilitar su seguimiento
- **Documentación**: Páginas HTML automáticas para cada tipo de error
- **Cumplimiento de estándares**: Implementación del RFC 7807 ampliamente adoptado
- **Facilidad de depuración**: Información detallada para desarrolladores y usuarios