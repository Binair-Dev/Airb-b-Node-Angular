import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  welcomer = "Bienvenue sur AirB&B";
  nom = "";
  prenom = "";
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getUser() !== null) {
      this.prenom = JSON.parse(this.authService.getUser()).Prenom;
      this.nom = JSON.parse(this.authService.getUser()).Nom;
    }
  }

}
