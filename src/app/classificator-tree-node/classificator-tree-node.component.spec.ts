import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificatorTreeNodeComponent } from './classificator-tree-node.component';

describe('ClassificatorTreeNodeComponent', () => {
  let component: ClassificatorTreeNodeComponent;
  let fixture: ComponentFixture<ClassificatorTreeNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificatorTreeNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificatorTreeNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
