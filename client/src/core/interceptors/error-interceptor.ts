import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core/primitives/di';
import { Router, NavigationExtras } from '@angular/router';
import { catchError } from 'rxjs/internal/operators/catchError';
import { ToastService } from '../services/toast-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  
  const toast = inject(ToastService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error) => {
      if(error){
        switch (error.status) {
          case 400:
            if(error.error.errors){
              const modelStateErrors = [];
              for(const key in error.error.errors){
                if(error.error.errors.hasOwnProperty(key)){
                  modelStateErrors.push(error.error.errors[key]);
                }
              }
              throw modelStateErrors.flat();
            }else{
                toast.showError(error.error);
              }
            break;
          case 401:
            toast.showError('Unauthorized request');
            break;
          case 404:
            router.navigateByUrl('/not-found');
            toast.showError('Resource not found');
            break;
          case 500:
            const navigationExtras : NavigationExtras = { state: { error: error.error } };
            router.navigateByUrl('/server-error', navigationExtras);
            break;
          default:
            toast.showError('Something went wrong');
            break;
        }
      }
        throw error;
    })
  );
};
