import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

/**
 * Servicio para generar y gestionar IDs de rastreo (traceId) para errores
 */
@Injectable()
export class TraceIdService {
  /**
   * Genera un ID de rastreo único con un prefijo que indica el tipo de error
   * @param errorType Tipo de error para incluir como prefijo
   * @returns ID de rastreo único con formato
   */
  generateTraceId(errorType: string = 'unknown'): string {
    // Normaliza el tipo de error para usarlo como prefijo
    const prefix = errorType.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Genera un UUID v4 y lo formatea para usar como traceId
    const uuid = uuidv4();

    // Combina el prefijo con el UUID para crear un traceId significativo
    return `${prefix}-${uuid}`;
  }

  /**
   * Valida si un traceId tiene el formato correcto
   * @param traceId ID de rastreo a validar
   * @returns true si el formato es válido
   */
  isValidTraceId(traceId: string): boolean {
    // Verifica si el traceId tiene el formato esperado: prefijo-uuid
    const regex =
      /^[a-z0-9]+-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    return regex.test(traceId);
  }
}
