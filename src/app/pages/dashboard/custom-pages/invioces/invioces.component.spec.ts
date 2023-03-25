import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviocesComponent } from './invioces.component';

describe('InviocesComponent', () => {
  let component: InviocesComponent;
  let fixture: ComponentFixture<InviocesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviocesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviocesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
