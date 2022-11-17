import { Injectable } from '@angular/core';
import { CriarConta } from '../models/criar-conta.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriarContaService {

  private listaCliente: any[];
  private url = 'http://localhost:3000/clientes'

  constructor(private httpClient: HttpClient) { 
    this.listaCliente = [];
  }

  // Transformar clientes na API
  get clientes(){
    return this.listaCliente
  }

  // Ler a API dos clientes e usar para exibir
  lerClientes(): Observable<CriarConta[]>{
    return this.httpClient.get<CriarConta[]>(this.url);
  }

  // Cadastrar novos clientes na API
  salvarClientes(cliente: CriarConta): Observable<CriarConta>{
    return this.httpClient.post<CriarConta>(this.url, cliente)
  }

  // Função para excluir
  excluirCliente(idCliente: any):Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${idCliente}`)
  }

  // Função para editar
  editarCliente(cliente:CriarConta):Observable<CriarConta>{
    return this.httpClient.put<CriarConta>(`${this.url}/${cliente.id}`, cliente)
  }

}