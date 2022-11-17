import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms'
import { CriarConta } from '../models/criar-conta.model';
import { CriarContaService } from '../services/criar-conta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  form!: FormGroup;
  clientes!: CriarConta[];
  guardarId!:number
  verificarEditar:boolean = false

  constructor(
    private fb: FormBuilder,
    private CriarContaService: CriarContaService,
    private snackBar: MatSnackBar,
    private route: Router
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      telefone: new FormControl('', [Validators.required])
    })
    this.form.valueChanges.subscribe(console.log)

    this.LerDadosCliente()
  }

  LerDadosCliente(){
    // Mostrar API no console
    this.CriarContaService.lerClientes().subscribe({
      next: (clientes: CriarConta[]) => {
        this.clientes = clientes
        console.table(clientes)
      },
      error: () => {
        console.log('Deu erro')
      }
    })
  }

  SalvarDadosCliente(){
    const id = (this.clientes[(this.clientes.length) - 1].id) + 1;
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;

    const cliente: CriarConta = {id:id, nome:nome, email:email, telefone:telefone}

    this.CriarContaService.salvarClientes(cliente).subscribe({
      next: () => {
        this.MostrarAlerta("sucesso")
        this.LerDadosCliente()
        this.route.navigateByUrl('generos')
      },
      error: () => {
        this.MostrarAlerta("erro")
      }
    })
    this.form.reset()
  }

  ExcluirCliente(idCliente:number){
    this.CriarContaService.excluirCliente(idCliente).subscribe({
      next:()=>{
        this.MostrarAlerta("excluiu")
        this.LerDadosCliente()
      },
      error:()=>{
        this.MostrarAlerta("erro_excluir")
      }
    })
  }

  EditarCliente1(){
    const id = this.guardarId
    const nome = this.form.controls["nome"].value;
    const email = this.form.controls["email"].value;
    const telefone = this.form.controls["telefone"].value;

    const cliente: CriarConta = {id:id, nome:nome, email:email, telefone:telefone}

    this.CriarContaService.editarCliente(cliente).subscribe({
      next: () => {
        this.MostrarAlerta("editou")
        this.LerDadosCliente()
      },
      error: () => {
        this.MostrarAlerta("erro_editou")
      }
    })
    this.verificarEditar = false
    this.form.reset()
  }

  EditarCliente2(itemCliente:CriarConta){
    this.guardarId = itemCliente.id
    this.form.controls["nome"].setValue(itemCliente.nome)
    this.form.controls["email"].setValue(itemCliente.email)
    this.form.controls["telefone"].setValue(itemCliente.telefone)
    this.verificarEditar = true
  }

  MostrarAlerta(aviso:string){
    switch (aviso) {
      case "sucesso":
        this.snackBar.open('Cadastro feito com sucesso!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;
    
      case "erro":
        this.snackBar.open('Cadastro falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "excluiu":
        this.snackBar.open('Cadastro excluido!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "erro_excluir":
        this.snackBar.open('Excluir Cadastro falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "editou":
        this.snackBar.open('Cadastro editado!', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;

      case "erro_editou":
        this.snackBar.open('Editar cadastro falhou. Por favor reinicie o sistema.', undefined, {
          duration:2000,
          panelClass: ['snackbar-tema']
        })
        break;
    }
  }

}

