import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  redirectToHome(){
    this.router.navigateByUrl("");
  }

  ngOnInit(): void {
    this.authService.logout();
    this.redirectToHome();
    setTimeout(function(){ window.location.reload(); }, 100);
  }
}
