import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassFeeStructureComponent } from './class-fee-structure.component';

describe('ClassFeeStructureComponent', () => {
  let component: ClassFeeStructureComponent;
  let fixture: ComponentFixture<ClassFeeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassFeeStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassFeeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
