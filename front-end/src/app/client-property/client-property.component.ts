import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Property } from '../_models/property';
import { AuthService } from '../_services/auth.service';
import { PropertyService } from '../_services/property.service';

@Component({
  selector: 'app-client-property',
  templateUrl: './client-property.component.html',
  styleUrls: ['./client-property.component.scss']
})
export class ClientPropertyComponent implements OnInit {
  title: String = "LISTE DE TES PROPRIETE";
  message: String = "";
  propertyList: Property[] = [];
  inscriptionForm: FormGroup;
  selected: Property = null;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private propertyService : PropertyService) {
    this.inscriptionForm = this.formBuilder.group({
      Titre: ['', [Validators.required]],
      PetiteDescription: ['', [Validators.required]],
      LongueDescription: ['', [Validators.required]],
      Pays: ['', [Validators.required]],
      Ville: ['', [Validators.required]],
      Rue: ['', [Validators.required]],
      Num: ['', [Validators.required]],
      CodePostal: ['', [Validators.required]],
      PictureUrl: ['', [Validators.required]],
      Capacite: ['', [Validators.required]],
      SDB: ['', [Validators.required]],
      WC: ['', [Validators.required]],
      Jardin: [''],
      Piscine: [''],
      MachineALaver: [''],
      Internet: [''],
      AnimauxAdmis: [''],
      Prix: ['', [Validators.required]],
      Assurance: [''],
      Availlable: [''],
    });
  }

  ngOnInit(): void {
    this.propertyService.getAll().then(data => {
      data.forEach(element => {
        if(element.proprioId === this.authService.getUser()._id && element.Deleted === false) {
          this.propertyList.push(element);
        }
      });
    })
  }

  setSelected(prop: Property) {
    this.selected = prop;
    this.inscriptionForm = this.formBuilder.group({
      Titre: [prop.Titre, [Validators.required]],
      PetiteDescription: [prop.PetiteDescription, [Validators.required]],
      LongueDescription: [prop.LongueDescription, [Validators.required]],
      PictureUrl: [prop.PictureUrl, [Validators.required]],
      Prix: [prop.Prix, [Validators.required]],
      Assurance: [prop.Assurance],
      Availlable: [prop.Availlable],
    });
    this.title = "MODIFIE: " + this.selected.Titre;
  }

  redirectToHome(){
    this.router.navigateByUrl("");
  }

  async updateProperty(form) {
    this.selected.Titre = form.value.Titre;
    this.selected.PetiteDescription = form.value.PetiteDescription;
    this.selected.LongueDescription = form.value.LongueDescription;
    this.selected.PictureUrl = form.value.PictureUrl;
    this.selected.Prix = form.value.Prix;
    this.selected.Assurance = form.value.Assurance;
    this.selected.Availlable = form.value.Availlable;
    
    this.propertyService.updateProperty(this.selected).then(data => {
      if(data !== null) this.message = "Propriété mise a jours avec succès";
    }).catch(error => {
      console.log(error);
        if(error !== null) this.message = "Erreur, veuillez ré-essayer !"
    });
  }

  async deleteProperty() {
    this.selected.Deleted = true;
    this.propertyService.updateProperty(this.selected).then(data => {
      if(data !== null) this.message = "Propriété supprimée succès";
    }).catch(error => {
      console.log(error);
        if(error !== null) this.message = "Erreur, veuillez ré-essayer !"
    });
  }
}
