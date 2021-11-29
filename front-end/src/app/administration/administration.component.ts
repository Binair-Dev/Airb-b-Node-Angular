import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../_models/property';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';
import { PropertyService } from '../_services/property.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  message: String = "";
  type: Number = 0;
  selected: Property = null;
  properties: Property[] = [];
  members: User[] = [];
  currentUser: User = null;
  constructor(private propertyService: PropertyService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();
    this.propertyService.getAll().then(data => {
      data.forEach(element => {
        if(element.Attente === true && element.Deleted !== true) this.properties.push(element)
      });
    }).catch(error => {
      this.message = "Erreur d'authentification, veuillez vous reconnecter !";
    });  

    this.authService.getAll().toPromise().then(data => {
      data.forEach(element => {
        this.members.push(element)
      });
    }).catch(error => {
      this.message = "Erreur d'authentification, veuillez vous reconnecter !";
    }); ;  
  }

 validate(prop: Property) {
    prop.Attente = false;
    this.propertyService.validateProperty(prop);
    //window.location.reload();
  }
 del(prop: any) {
    prop.Attente = false;
    this.propertyService.deleteProperty(prop);
    window.location.reload();
  }
 profile(id: any) {
    this.selected = this.properties[id];
  }

 reset() {
    this.selected = null; 
  }

 delUser(user: any) {
   this.authService.deleteUser(user._id).toPromise().then(data => {
     window.location.reload();
   })
 }
 switchAdmin(user:any) {
   this.authService.updateUser(user.Email, {
     Nom: user.Nom,
     Prenom: user.Prenom,
     Email: user.Email,
     Pays: user.Pays,
     Telephone: user.Telephone,
     Password: user.Password,
     isAdmin: !user.isAdmin,
     Token: user.Token
    }).toPromise().then(data => {
    window.location.reload();
   })
 }

 authError() {
   this.router.navigateByUrl('logout');
 }
}
