import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedicalWorldComponent } from './add-medical-world.component';

describe('AddMedicalWorldComponent', () => {
  let component: AddMedicalWorldComponent;
  let fixture: ComponentFixture<AddMedicalWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMedicalWorldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedicalWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
