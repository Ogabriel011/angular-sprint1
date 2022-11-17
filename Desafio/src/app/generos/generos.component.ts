import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { CadastroGenero } from '../models/criar-conta.model';
import { GenerosService } from '../services/generos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss']
})
export class GenerosComponent implements OnInit {

  form!: FormGroup;
  generos!: CadastroGenero[];
  guardarId!:number;
  verificarEditar:boolean =  false

  constructor(
    private fb:FormBuilder,
    private GenerosService: GenerosService,
    private snackBar: MatSnackBar,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      genero: new FormControl('', [Validators.required])
    })
    this.form.valueChanges.subscribe(console.log)
    this.LerGeneros()
  }

  LerGeneros(){
    this.GenerosService.lerGeneros().subscribe({
      next: (generos: CadastroGenero[]) => {
        this.generos = generos
        console.log(generos)
      },
      error: () => {
        console.log('Deu erro')
      }
    })
  }

  SalvarGeneros(){
    const id = (this.generos[(this.generos.length) - 1].id) + 1;
    const genero = this.form.controls["genero"].value

    const generos = {id:id, genero:genero}

    this.GenerosService.salvarGenero(generos).subscribe({
      next: () => {
        this.MostrarAlerta("sucesso")
        this.LerGeneros()
        this.route.navigateByUrl('filmes')
      },
      error: () => {
        this.MostrarAlerta("erro")
      }
    })
  }

  ExcluirGenero(idGenero:number){
    this.GenerosService.excluirGenero(idGenero).subscribe({
      next:()=>{
        this.MostrarAlerta("excluiu")
        this.LerGeneros()
      },
      error:()=>{
        this.MostrarAlerta("erro_excluir")
      }
    })
  }

  EditarGenero1(){
    const id = this.guardarId
    const genero = this.form.controls["genero"].value

    const generos = {id:id, genero:genero}

    this.GenerosService.editarGenero(generos).subscribe({
      next: () => {
        this.MostrarAlerta("editou")
        this.LerGeneros()
      },
      error: () => {
        this.MostrarAlerta("erro_editar")
      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarGenero2(itemGenero: CadastroGenero){
    this.guardarId = itemGenero.id
    this.form.controls["genero"].setValue(itemGenero.genero)
    this.verificarEditar = true
  }

  MostrarAlerta(aviso:string){
    switch (aviso) {
      case "sucesso":
        this.snackBar.open('Cadastro do gênero feito com sucesso!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;
    
      case "erro":
        this.snackBar.open('Cadastro do gênero falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "excluiu":
        this.snackBar.open('gênero excluido!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "erro_excluir":
        this.snackBar.open('Excluir gênero falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "editou":
        this.snackBar.open('gênero editado!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "erro_editou":
        this.snackBar.open('Editar gênero falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;
    }
  }
}
