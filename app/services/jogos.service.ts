import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jogo } from '../Jogo';

@Injectable({
  providedIn: 'root'
})
export class JogosService {

  private apiUrl = 'https://localhost:7043/api/Jogo'

  constructor(private http: HttpClient) { }

  createJogo(jogo: Jogo): Observable<Jogo> {
    const url = `${this.apiUrl}`
    return this.http.post<Jogo>(url, jogo);
  }

  getJogos(): Observable<Jogo[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<Jogo[]>(url);
  }

  removeJogo(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  updateJogo(id: number, jogo: Jogo): Observable<Jogo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Jogo>(url, jogo);
  }
}
