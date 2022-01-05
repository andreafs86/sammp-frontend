import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxInputComponent } from './btx-input.component';

describe('BtxInputComponent', () => {
  let component: BtxInputComponent;
  let fixture: ComponentFixture<BtxInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
