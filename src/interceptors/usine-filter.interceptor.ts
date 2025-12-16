import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UsineStatutInterceptor implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('🔍 Interceptor UsineStatut activé');

    return next.handle().pipe(
      map((data) => {
        const filterUsine = (usine: any) => {
          
          // Si statut = true : renvoyer toutes les infos
          if (usine.statut === true) {
            return usine;
          }
          
          // Si statut = false : renvoyer seulement le nom
          if (usine.statut === false) {
            return {
              nom: usine.nom
            };
          }
          
          // Par défaut : tout visible
          return usine;
        };

        // Si tableau d'usines
        if (Array.isArray(data)) {
          return data.map(filterUsine);
        }

        // Si une seule usine
        return filterUsine(data);
      })
    );
  }
}