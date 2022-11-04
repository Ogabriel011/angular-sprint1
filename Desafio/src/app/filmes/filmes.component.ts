import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-filmes',
  templateUrl: './filmes.component.html',
  styleUrls: ['./filmes.component.scss']
})
export class FilmesComponent implements OnInit {

  form!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      filme: '',
      genero: ''
    })
    this.form.valueChanges.subscribe(console.log)
  }

}
