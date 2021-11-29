import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Property } from '../_models/property';
import { PropertyParam } from '../_models/property-param';
import { PropertyService } from '../_services/property.service';

@Component({
  selector: 'app-property-rent',
  templateUrl: './property-rent.component.html',
  styleUrls: ['./property-rent.component.scss']
})
export class PropertyRentComponent implements OnInit {

  title: String = "LOUEZ UNE PROPRIETE";
  message: String = null;
  selected: Property = null;
  param: string = null;
  rentForm: FormGroup;
  days: number = 0;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private propertiesService: PropertyService) {
    this.rentForm = this.formBuilder.group({
      Date1: ['', [Validators.required]],
      Date2: ['', [Validators.required]],
      Assurance: ['', [Validators.required]],
    });
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params) this.param = (params as PropertyParam).property;
      }
    );
    this.propertiesService.getByPropertyId(this.param).then(data => {
      this.selected = data;
    });
  }

  rent(form) {
    this.message = "Récapitulatif";
    this.days = this.dateDiffInDays(new Date(form.value.Date1), new Date(form.value.Date2));
    
  }

  validate() {
    console.log("Validate");
    
  }

  dateDiffInDays(a, b) {
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
    return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
  }
}
