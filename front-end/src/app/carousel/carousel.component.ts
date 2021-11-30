import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Property } from '../_models/property';
import { AuthService } from '../_services/auth.service';
import { PropertyService } from '../_services/property.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  carousel: Property[] = []
  currentSlide = 0;

  constructor(private propServices: PropertyService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void { 
    this.propServices.getAll().then(data => {
      if(data) {
        data.forEach(element => {
          if(this.carousel.length < 4) {
            this.carousel.push(element);
          }
          else return;
        });
      }
    })
  }

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.carousel.length - 1 : previous;
    console.log("previous clicked, new current slide is: ", this.currentSlide);
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.carousel.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.currentSlide);
  }

  open() {
    if(this.authService.getUser() !== null)
      this.router.navigateByUrl('rentproperty?property=' + this.carousel[this.currentSlide]._id)
    else
      window.alert("Erreur, Vous devez être connecté pour voir les détails d'une propriété!");
  }
}
