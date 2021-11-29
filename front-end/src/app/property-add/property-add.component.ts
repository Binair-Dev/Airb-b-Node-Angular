import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from '../_data/country-data-store';
import { AuthService } from '../_services/auth.service';
import { PropertyService } from '../_services/property.service';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['./property-add.component.scss']
})
export class PropertyAddComponent implements OnInit {
  title: String = "AJOUTER UNE PROPRIETE";
  message: String = "";
  countryList = countries;
  inscriptionForm: FormGroup;
  isFirst = false;

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
    
  }

  redirectToHome(){
    this.router.navigateByUrl("");
  }

  async registerProperty(form) {
    form.value.Attente = true;
    form.value.proprioId = this.authService.getUser()._id;
    form.value.Availlable = true;
    
    if(form.value.Jardin === "") form.value.Jardin = false;
    if(form.value.Piscine === "") form.value.Piscine = false;
    if(form.value.MachineALaver === "") form.value.MachineALaver = false;
    if(form.value.Internet === "") form.value.Internet = false;
    if(form.value.AnimauxAdmis === "") form.value.AnimauxAdmis = false;
    if(form.value.Assurance === "") form.value.Assurance = false;
    
    this.propertyService.register(form.value).then(data => {
        if(data) this.message = "Vous avez bien ajouté cette propriété !";
    }).catch(error => {
        if(error) this.message = "Erreur lors de l'ajout.. Veuillez réessayer !";
    });
  }
}
