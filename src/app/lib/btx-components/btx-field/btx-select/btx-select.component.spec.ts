import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxSelectComponent } from './btx-select.component';

describe('BtxSelectComponent', () => {
  let component: BtxSelectComponent;
  let fixture: ComponentFixture<BtxSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
