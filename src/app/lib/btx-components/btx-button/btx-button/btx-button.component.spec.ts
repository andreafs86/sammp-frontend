import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxButtonComponent } from './btx-button.component';

describe('BtxButtonComponent', () => {
  let component: BtxButtonComponent;
  let fixture: ComponentFixture<BtxButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
