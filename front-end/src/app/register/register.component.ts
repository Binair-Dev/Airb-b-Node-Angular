import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { countries } from '../_data/country-data-store';
import { AuthService } from '../_services/auth.service';
import { ValidationService } from '../_services/validation.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
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
    this.router.navigateByUrl("");
  }

  async registerAccount(form) {
    let res = false;
    form.value.isAdmin = false;
    form.value.Password = await sha256(form.value.Password);
    this.authService.getByEmail(form.value.Email).toPromise().then(resp => {
      if (resp.Email === form.value.Email) {
        res = true;
      }
    }).finally(() => {
      try {
        if (res === false) {
          this.authService.register(form.value).toPromise().then().finally(() => {
            this.message = "Inscription réussie !"
          });
        }
        else {
          this.title = "Erreur d'inscription"
          this.message = "Erreur, un utilisateur ayant cette adresse email existe déjà !"
        }
      } catch (error) {
        console.log("Erreur: " + error);
      }
    });
  }

}
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}
