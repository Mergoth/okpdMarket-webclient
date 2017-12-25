import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByTextComponent } from './search-by-text.component';

describe('SearchByTextComponent', () => {
  let component: SearchByTextComponent;
  let fixture: ComponentFixture<SearchByTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
