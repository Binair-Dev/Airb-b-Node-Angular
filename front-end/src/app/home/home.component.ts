import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  welcomer = "Bienvenue sur AirB&B";
  currentUser: User = null;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if(this.authService.getUser() !== null) {
      this.currentUser = this.authService.getUser();
    }
  }
}