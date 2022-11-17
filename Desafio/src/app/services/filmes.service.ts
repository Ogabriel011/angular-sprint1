import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroFilmes } from '../models/criar-conta.model';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  private listaFilmes: any[];
  private url = 'http://localhost:3000/filmes'

  constructor(private httpClient: HttpClient) {
    this.listaFilmes = [];
   }

   get filmes(){
    return this.listaFilmes
   }

   lerFilmes(): Observable<CadastroFilmes[]>{
    return this.httpClient.get<CadastroFilmes[]>(`${this.url}?_expand=genero`)
   }

   salvarFilme(filmes: CadastroFilmes): Observable<CadastroFilmes>{
    return this.httpClient.post<CadastroFilmes>(this.url, filmes)
   }

   excluirFilme(idFilme: any):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${idFilme}`)
  }

  editarFilme(filme:CadastroFilmes):Observable<CadastroFilmes>{
    return this.httpClient.put<CadastroFilmes>(`${this.url}/${filme.id}`, filme)
  }
}
