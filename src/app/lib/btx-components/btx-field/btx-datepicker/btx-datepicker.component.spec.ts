import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxDatepickerComponent } from './btx-datepicker.component';

describe('BtxDatepickerComponent', () => {
  let component: BtxDatepickerComponent;
  let fixture: ComponentFixture<BtxDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
