import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ValidationService } from '../_services/validation.service';
import { sha256 } from '../_tools/password-hash';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title: String = "CONNECTEZ VOUS";
  message: String = "";
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      Email: ['', [Validators.required, ValidationService.emailValidator]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    });
  }

  ngOnInit(): void {

  }
  redirectToHome(){
    this.router.navigateByUrl("");
    setTimeout(function() {window.location.reload();}, 50)
  }

  async loginAccount(form) {
    form.value.Password = await sha256(form.value.Password);
    this.authService.login(form.value).toPromise().then(data => {
      console.log(data);
      
      this.authService.setUser(JSON.stringify(data))
      this.authService.isLogged.next(true);
      this.message = "Connexion réussie !";
    }).catch(err => {
      this.message = "Connexion échouée !"
    })
  }
}
