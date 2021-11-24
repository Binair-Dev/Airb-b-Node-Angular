import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/_services/validation.service';

@Component({
  selector: 'control-messages',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.sass']
})
export class ControlMessageComponent implements OnInit {
  errorMessage: string;
  @Input() control: FormControl;
  constructor() { }
  ngOnInit(): void {
    
  }
  get errorMessages() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        return ValidationService.getValidatorErrorMessage(
          propertyName,
          this.control.errors[propertyName]
        );
      }
    }
    return null;
  }
}
