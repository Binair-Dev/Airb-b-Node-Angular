import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';
import { Property } from '../_models/property';
import { PropertyService } from '../_services/property.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  properties: Property[] = [];
  welcomer = "Bienvenue sur AirB&B";
  currentUser: User = null;
  constructor(private authService: AuthService, private propertyService: PropertyService, private router: Router) { }

  ngOnInit(): void {
    if(this.authService.getUser() !== null) {
      this.currentUser = this.authService.getUser();
    }
    this.propertyService.getAll().then(data => {
      data.forEach(element => {
        if(element.Availlable && !element.Deleted && !element.Attente) this.properties.push(element)
      });
    });
  }

  rentProp(id: string) {
    if(this.authService.getUser() !== null)
      this.router.navigateByUrl('rentproperty?property=' + id)
    else
      window.alert("Erreur, Vous devez être connecté pour voir les détails d'une propriété!");
  }
}