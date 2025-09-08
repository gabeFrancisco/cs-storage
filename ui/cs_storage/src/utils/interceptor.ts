import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { tap } from "rxjs";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const cloned = req.clone({ withCredentials: true })
  return next(cloned).pipe(tap(() => { },
    (err: any) => {
      if(err.status !== 401){
        return
      }
      // alert("Sessão expirada! Por favor, proceda para a tela de login!")
      localStorage.removeItem("user");
      router.navigate(["login"]);
    }));
};
