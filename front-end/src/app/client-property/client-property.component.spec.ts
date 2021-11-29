import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPropertyComponent } from './client-property.component';

describe('ClientPropertyComponent', () => {
  let component: ClientPropertyComponent;
  let fixture: ComponentFixture<ClientPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
