import { Injectable } from '@angular/core';
import { Empresa } from '../Empresa';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  private tokenKey = 'token';

  private apiUrl = 'https://localhost:7043/api/Empresa'

  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<Empresa[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Empresa[]>(url);
  }

  obterJogosDaEmpresaLogada() {
    const url = `${this.apiUrl}/jogos-da-empresa-logada`;
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(url, { headers });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(atob(base64));
  }

  getUserIdFromToken(): number | null {
    const token = this.getToken();
    if (token) {
      const tokenData = this.decodeToken(token);
      return tokenData.IdEmpresa;
    }
    return null;
  }

  searchEmpresas(termoPesquisa: string): Observable<Empresa[]> {
    const url = `${this.apiUrl}`;
    const params = new HttpParams().set('termo', termoPesquisa);
    return this.http.get<Empresa[]>(url, { params });
  }

  removeEmpresa(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateEmpresa(id: number, empresa: Empresa): Observable<any> {
    const token = localStorage.getItem('token');
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    return this.http.put(url, empresa, { headers }).pipe(
      tap((data) => console.log('Resposta da requisição de atualização:', data)),
      catchError((error) => {
        console.error('Erro na requisição de atualização:', error);
  
        if (error.status === 403) {
          console.error('Acesso não autorizado. Verifique as permissões do usuário.');
        }
  
        return throwError(error); // Rethrow para manter o encadeamento de erros
      })
    );
  }
  
}
