import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificatorPageComponent } from './classificator-page.component';

describe('ClassificatorPageComponent', () => {
  let component: ClassificatorPageComponent;
  let fixture: ComponentFixture<ClassificatorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificatorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
