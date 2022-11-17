import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroGenero } from '../models/criar-conta.model';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  private listaGenero: any[];
  private url = 'http://localhost:3000/generos'

  constructor(private httpClient: HttpClient) {
    this.listaGenero = [];
   }

   get generos(){
    return this.listaGenero
   }

   lerGeneros(): Observable<CadastroGenero[]>{
    return this.httpClient.get<CadastroGenero[]>(this.url)
   }

   salvarGenero(generos: CadastroGenero): Observable<CadastroGenero>{
    return this.httpClient.post<CadastroGenero>(this.url, generos)
   }

   excluirGenero(idGenero: any):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${idGenero}`)
  }

  editarGenero(genero:CadastroGenero):Observable<CadastroGenero>{
    return this.httpClient.put<CadastroGenero>(`${this.url}/${genero.id}`, genero)
  }
}
