/**
 * Interfaz que representa el estándar RFC 7807 Problem Details
 */
export interface ProblemDetails {
  /**
   * URI que identifica el tipo de problema
   * Debe apuntar a una página HTML con documentación sobre el error
   */
  type: string;

  /**
   * Resumen breve y legible del problema
   */
  title: string;

  /**
   * Código de estado HTTP
   */
  status: number;

  /**
   * Explicación detallada del problema
   */
  detail?: string;

  /**
   * URI que identifica la instancia específica del problema
   */
  instance?: string;

  /**
   * Marca de tiempo cuando ocurrió el error
   */
  timestamp: string;

  /**
   * Identificador único de rastreo para el error
   * Formato: {tipo-error}-{uuid}
   */
  traceId: string;

  /**
   * Detalles adicionales sobre errores específicos (ej. errores de validación)
   */
  errors?: Record<string, any>[];

  /**
   * Propiedades adicionales específicas del problema
   */
  [key: string]: any;
}
