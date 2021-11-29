import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyRentComponent } from './property-rent.component';

describe('PropertyRentComponent', () => {
  let component: PropertyRentComponent;
  let fixture: ComponentFixture<PropertyRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
