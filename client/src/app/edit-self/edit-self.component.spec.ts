import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelfComponent } from './edit-self.component';

describe('EditSelfComponent', () => {
  let component: EditSelfComponent;
  let fixture: ComponentFixture<EditSelfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSelfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
