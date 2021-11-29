import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { ClientPropertyComponent } from './client-property/client-property.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { PropertyAddComponent } from './property-add/property-add.component';
import { PropertyRentComponent } from './property-rent/property-rent.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path : '', component : HomeComponent},
  {path : 'home', component : HomeComponent},
  {path : 'register', component : RegisterComponent},
  {path : 'login', component : LoginComponent},
  {path : 'logout', component : LogoutComponent},
  {path : 'addproperty', component : PropertyAddComponent},
  {path : 'rentproperty', component : PropertyRentComponent},
  {path : 'client-properties', component : ClientPropertyComponent},
  {path : 'admin', component : AdministrationComponent},
  //{path : 'about', component : AboutComponent},
  //{path : 'nouveau', loadChildren : () => import('./nouveau/nouveau.module').then(m => m.NouveauModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
