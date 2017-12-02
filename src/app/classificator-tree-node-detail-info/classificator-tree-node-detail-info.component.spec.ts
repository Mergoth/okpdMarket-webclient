import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificatorTreeNodeDetailInfoComponent } from './classificator-tree-node-detail-info.component';

describe('ClassificatorTreeNodeDetailInfoComponent', () => {
  let component: ClassificatorTreeNodeDetailInfoComponent;
  let fixture: ComponentFixture<ClassificatorTreeNodeDetailInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificatorTreeNodeDetailInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificatorTreeNodeDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
