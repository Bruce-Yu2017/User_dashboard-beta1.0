import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOtherComponent } from './edit-other.component';

describe('EditOtherComponent', () => {
  let component: EditOtherComponent;
  let fixture: ComponentFixture<EditOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
