import { Component, OnInit } from '@angular/core';
import { Property } from '../_models/property';
import { PropertyService } from '../_services/property.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {

  selected: Property = null;
  properties: Property[] = [];
  constructor(private propertyService: PropertyService) { }

  ngOnInit(): void {
    this.propertyService.getAll().then(data => {
      data.forEach(element => {
        if(element.Attente === true) this.properties.push(element)
      });
    });    
  }

  validate(id: any) {
    let prop = this.properties[id];
    prop.Attente = false;
    this.propertyService.validateProperty(prop);
    window.location.reload();
  }
  del(id: any) {
    let prop = this.properties[id];
    prop.Attente = false;
    this.propertyService.deleteProperty(prop);
    window.location.reload();
  }
  profile(id: any) {
    this.selected = this.properties[id];
  }

  reset() {
    this.selected = null;
  }
}
