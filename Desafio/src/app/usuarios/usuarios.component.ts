import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: '',
      email: '',
      telefone: '',
    })
    this.form.valueChanges.subscribe(console.log)
  }

}
