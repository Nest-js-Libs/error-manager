export const DESCRIPTIONS_ERROR: Record<string, string> = {
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


export const SOLUTIONS_ERRORS: Record<string, string[]> = {
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