import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxHeaderComponent } from './btx-header.component';

describe('BtxHeaderComponent', () => {
  let component: BtxHeaderComponent;
  let fixture: ComponentFixture<BtxHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
