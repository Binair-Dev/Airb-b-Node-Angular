import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'register', component : RegisterComponent},
  //{path : 'about', component : AboutComponent},
  //{path : 'nouveau', loadChildren : () => import('./nouveau/nouveau.module').then(m => m.NouveauModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
