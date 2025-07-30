import { throwError } from "rxjs";

export function handleNetworkError(op: string){
  return (error: any) => {
    console.error(`Erro durante ${op}:`, error);
    return throwError(() => new Error(`${op} falhou.`));
  };
}
