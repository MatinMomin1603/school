import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberOfStaffComponent } from './member-of-staff.component';

describe('MemberOfStaffComponent', () => {
  let component: MemberOfStaffComponent;
  let fixture: ComponentFixture<MemberOfStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberOfStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberOfStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
