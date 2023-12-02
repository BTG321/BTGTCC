import { Injectable } from '@angular/core';
import { Usuario } from '../Usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:7043/api/Usuario'

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Usuario[]>(url);
  }

  searchUsuarios(termoPesquisa: string): Observable<Usuario[]> {
    const url = `${this.apiUrl}`;
    
    // Configurar parâmetros de pesquisa
    const params = new HttpParams().set('termo', termoPesquisa);

    // Fazer a solicitação HTTP com parâmetros de pesquisa
    return this.http.get<Usuario[]>(url, { params });
  }

  removeUsuario(id: number) {
     const url = `${this.apiUrl}/${id}`;
     return this.http.delete(url);
  }
}
