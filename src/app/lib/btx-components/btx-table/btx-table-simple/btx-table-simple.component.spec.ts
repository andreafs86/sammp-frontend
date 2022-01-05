import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxTableSimpleComponent } from './btx-table-simple.component';

describe('BtxTableSimpleComponent', () => {
  let component: BtxTableSimpleComponent;
  let fixture: ComponentFixture<BtxTableSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxTableSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxTableSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
