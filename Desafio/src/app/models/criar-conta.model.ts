export interface CriarConta{
    id:number;
    nome:string;
    email:string;
    telefone:number;
}

export interface CadastroFilmes{
    id:number;
    nome: string;
    genero?:CadastroGenero;
    generoId:number;
}

export interface CadastroGenero{
    id:number;
    genero:string;
}