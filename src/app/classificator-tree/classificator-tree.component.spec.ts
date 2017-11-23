import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificatorTreeComponent } from './classificator-tree.component';

describe('ClassificatorTreeComponent', () => {
  let component: ClassificatorTreeComponent;
  let fixture: ComponentFixture<ClassificatorTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificatorTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificatorTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
