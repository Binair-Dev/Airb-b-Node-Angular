import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from '../_data/country-data-store';
import { AuthService } from '../_services/auth.service';
import { ValidationService } from '../_services/validation.service';
import { sha256 } from '../_tools/password-hash';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  title: String = "INSCRIVEZ VOUS";
  message: String = "";
  countryList = countries;
  inscriptionForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.inscriptionForm = this.formBuilder.group({
      Prenom: ['', [Validators.required]],
      Nom: ['', [Validators.required]],
      Email: ['', [Validators.required, ValidationService.emailValidator]],
      Pays: ['', [Validators.required]],
      Telephone: ['', [Validators.required]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {
    
  }

  redirectToHome(){
    this.router.navigateByUrl("login");
  }

  async registerAccount(form) {
    form.value.Password = await sha256(form.value.Password);
    this.authService.register(form.value).toPromise().then(data => {
        if(data) this.message = "Vous avez bien été enregistré !";
    }).catch(error => {
        if(error) this.message = "Erreur lors de votre enregistrement.. Veuillez réessayer !";
    });
  }
}