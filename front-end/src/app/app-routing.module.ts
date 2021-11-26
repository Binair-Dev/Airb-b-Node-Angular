import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_services/auth-guard.service';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'admin', component : AdministrationComponent, canActivate: [AuthGuard]},
  //{path : 'about', component : AboutComponent},
  //{path : 'nouveau', loadChildren : () => import('./nouveau/nouveau.module').then(m => m.NouveauModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
