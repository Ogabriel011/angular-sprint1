import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { CadastroFilmes, CadastroGenero } from '../models/criar-conta.model';
import { FilmesService } from '../services/filmes.service';
import { GenerosService } from '../services/generos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  form!: FormGroup;
  filmes!: CadastroFilmes[];
  generos!: CadastroGenero[];
  verificarEditar:boolean = false;
  guardarId!:number

  constructor(
    private fb: FormBuilder,
    private filmesService:FilmesService,
    private generosService: GenerosService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required])
    })
    this.form.valueChanges.subscribe(console.log)
    this.LerFilmes()
    this.LerGeneros()
  }

  LerFilmes(){
    this.filmesService.lerFilmes().subscribe({
      next: (filmes: CadastroFilmes[]) => {
        this.filmes = filmes
        console.log(filmes)
      },
      error: () => {
        console.log('Erro')
      }
    })
  }

  LerGeneros(){
    this.generosService.lerGeneros().subscribe({
      next: (generos: CadastroGenero[]) => {
        this.generos = generos
        console.log(generos)
      },
      error: () => {
        console.log('Deu erro')
      }
    })
  }

  SalvarDadosFilmes(){
    const id = (this.filmes[(this.filmes.length) - 1].id) + 1;
    const nome = this.form.controls["nome"].value
    const genero = (this.form.controls["genero"].value)

    const filme = {id:id, nome:nome, generoId: genero}

    this.filmesService.salvarFilme(filme).subscribe({
      next: () => {
        
        this.MostrarAlerta("sucesso")
        this.LerFilmes()
      },
      error: () => {
        this.MostrarAlerta("erro")
      }
    })
    this.form.reset()
  }

  ExcluirFilme(idFilme:number){
    this.filmesService.excluirFilme(idFilme).subscribe({
      next:()=>{
        this.MostrarAlerta("excluiu")
        this.LerFilmes()
      },
      error:()=>{
        this.MostrarAlerta("erro_excluir")
      }
    })
  }

  EditarFilme1(){
    const id = this.guardarId
    const nome = this.form.controls["nome"].value
    const genero = (this.form.controls["genero"].value)

    const filme = {id:id, nome:nome, generoId: genero}

    this.filmesService.editarFilme(filme).subscribe({
      next: () => {
        this.MostrarAlerta("editou")
        this.LerFilmes()
      },
      error: () => {
        this.MostrarAlerta("erro_editou")
      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarFilme2(itemFilme:CadastroFilmes){
    this.guardarId = itemFilme.id
    this.form.controls["nome"].setValue(itemFilme.nome)
    this.form.controls["genero"].setValue(itemFilme.genero)
    this.verificarEditar = true
  }

  MostrarAlerta(aviso:string){
    switch (aviso) {
      case "sucesso":
        this.snackBar.open('Cadastro do filme feito com sucesso!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;
    
      case "erro":
        this.snackBar.open('Cadastro do filme falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "excluiu":
        this.snackBar.open('Filme excluido!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "erro_excluir":
        this.snackBar.open('Excluir filme falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "editou":
        this.snackBar.open('Filme editado!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "erro_editou":
        this.snackBar.open('Editar filme falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;
    }
  }
}
