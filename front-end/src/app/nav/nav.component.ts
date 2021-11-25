import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  listeLien:Link[];
  constructor(private authService: AuthService) { }

  toggle(link:Link)
  {
    link.isVisible = !link.isVisible;
  }
  
  ngOnInit(): void {
    this.listeLien = [
      {url: '/', title : 'Accueil'},
      /*{title : 'Exos', children : [
        {url: '/exercice/chrono', title : 'Chrono'},
        {url: '/exercice/courses', title : 'Liste de Courses'},
        {url: '/exercice/courses-plus', title : 'Liste de Courses ++'},
        {url: '/exercice/fan-add', title : 'Ajouter un Fan'},
        {url: '/exercice/fanlist', title : 'Liste des Fans'},
      ]},/**/
    ];
    if(this.authService.getUser() === null){
      this.listeLien.push({url: '/register', title : 'Register'});
      this.listeLien.push({url: '/login', title : 'Login'});
      
    }
    else {
      this.listeLien.push({url: '/logout', title : 'Logout'});
      if(JSON.parse(this.authService.getUser()).isAdmin === true) {
        this.listeLien.push({url: '/admin', title : 'Admin'});
      }
    }
  }
}

export class Link
{
  title : string;
  url?: string;
  children?: Link[];
  isVisible?: boolean = false;
}