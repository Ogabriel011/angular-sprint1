import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mensagemHeader:string = 'Conheça nossa coletânea';

  constructor(private router:Router) { }


  ngOnInit(): void {
    console.log(this.router.url);
    
    if (this.router.url === '/home') {
      this.mensagemHeader = 'Conheça nossa coletânea'
    }
    else if (this.router.url === '/usuarios') {
      this.mensagemHeader = 'Faça o Cadastro de usuários e  edite, caso necessário. Pronto para cadastrar?'
    }
    else if (this.router.url === '/filmes') {
      this.mensagemHeader = 'Cadastre o filme de sua preferência'
    }
    else if (this.router.url === '/generos') {
      this.mensagemHeader = 'Cadastre os gêneros dos filmes'
    }
  }

}
