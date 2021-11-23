import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {

  listeLien:Link[];
  constructor() { }

  toggle(link:Link)
  {
    link.isVisible = !link.isVisible;
  }
  
  ngOnInit(): void {
    this.listeLien = [
      {url: '/home', title : 'Home'},
      /*{title : 'Exos', children : [
        {url: '/exercice/chrono', title : 'Chrono'},
        {url: '/exercice/courses', title : 'Liste de Courses'},
        {url: '/exercice/courses-plus', title : 'Liste de Courses ++'},
        {url: '/exercice/fan-add', title : 'Ajouter un Fan'},
        {url: '/exercice/fanlist', title : 'Liste des Fans'},
      ]},/**/
    ];
  }
}

export class Link
{
  title : string;
  url?: string;
  children?: Link[];
  isVisible?: boolean = false;
}