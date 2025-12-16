import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ProductFilterInterceptor implements NestInterceptor {
  
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const role = request.headers?.role;
    
    console.log('🔍 Rôle détecté:', role);

    return next.handle().pipe(
      map((data) => {
        const filterProduct = (product: any) => {
          
          // Si ADMIN : voir toutes les infos
          if (role === 'admin') {
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              category: product.category,
              stock: product.stock,
              status: product.status,
              createdAt: product.createdAt,
              updatedAt: product.updatedAt
            };
          }
          
          // Si CLIENT : voir seulement nom et prix
          if (role === 'client') {
            return {
              name: product.name,
              price: product.price,
              status: product.status
            };
          }
          
          // Par défaut : tout visible
          return product;
        };

        // Si c'est un tableau de produits
        if (Array.isArray(data)) {
          return data.map(filterProduct);
        }

    
        return filterProduct(data);
      })
    );
  }
}