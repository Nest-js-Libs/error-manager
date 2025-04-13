import { Module } from "@nestjs/common";
import { ErrorManagerModule } from "src/lib/error-manager.module";

@Module({
    imports: [ErrorManagerModule.forRoot({
        descriptions: {
            unauthorized: 'Mensaje personalizado para no autorizado',
            // ... otros mensajes
        },
        solutions: {
            unauthorized: [
                'Solución personalizada 1',
                'Solución personalizada 2'
            ],
            // ... otras soluciones
        }
    })],
})
export class AppModule {}