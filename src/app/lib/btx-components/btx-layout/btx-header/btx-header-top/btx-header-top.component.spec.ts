import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxHeaderTopComponent } from './btx-header-top.component';

describe('BtxHeaderTopComponent', () => {
  let component: BtxHeaderTopComponent;
  let fixture: ComponentFixture<BtxHeaderTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxHeaderTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxHeaderTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
