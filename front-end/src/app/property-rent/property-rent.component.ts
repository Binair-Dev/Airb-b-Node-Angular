import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../_models/property';
import { PropertyParam } from '../_models/property-param';
import { PropertyService } from '../_services/property.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-property-rent',
  templateUrl: './property-rent.component.html',
  styleUrls: ['./property-rent.component.scss']
})
export class PropertyRentComponent implements OnInit {

  lastconfirm: String = null;
  title: String = "LOUEZ UNE PROPRIETE";
  message: String = null;
  selected: Property = null;
  param: string = null;
  rentForm: FormGroup;
  days: number = 0;
  date1: Date = null;
  date2: Date = null;
  assurance: boolean = false;
  today: string = new Date().toISOString().split("T")[0];
  tomorow: string = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private propertiesService: PropertyService, private authService: AuthService, private router : Router) {
    this.rentForm = this.formBuilder.group({
      Date1: ['', [Validators.required]],
      Date2: ['', [Validators.required]],
      Assurance: ['', [Validators.required]],
    });
   }

   returnToHome() {
     this.router.navigateByUrl("");
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params) this.param = (params as PropertyParam).property;
      }
    );
    this.propertiesService.getByPropertyId(this.param).then(data => {
      this.selected = data;
    });
    if(this.selected !== null && this.selected.Assurance === true) this.assurance = true;
  }

  rent(form) {
    if(new Date(form.value.Date2) > new Date(form.value.Date1)) {
      this.message = "Récapitulatif";
      this.days = this.dateDiffInDays(new Date(form.value.Date1), new Date(form.value.Date2));
      this.date1 = new Date(form.value.Date1);
      this.date2 = new Date(form.value.Date2);
    }
    else {
      window.alert("Erreur, Les deux dates sonts incohérentes !")
    }
  }

  validate() {
    const contract = {
      locataireId: this.authService.getUser()._id,
      proprioId: this.selected.proprioId,
      startDate: this.date1,
      endDate: this.date2,
      Assurance: this.assurance,
    };
    console.log(contract);
    this.propertiesService.registerContract(contract).then(data => {
      this.message = null;
      this.lastconfirm = "";
    }).catch(err => {
      if(err) window.alert("Erreur lors de la réservation, veuillez réessayer");
    });
  }

  dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  }
}
