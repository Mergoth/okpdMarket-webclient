import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificatorsComponent } from './classificators.component';

describe('ClassificatorsComponent', () => {
  let component: ClassificatorsComponent;
  let fixture: ComponentFixture<ClassificatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
