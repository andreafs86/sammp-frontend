import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxGlobalAttributesComponent } from './btx-global-attributes.component';

describe('BtxGlobalAttributesComponent', () => {
  let component: BtxGlobalAttributesComponent;
  let fixture: ComponentFixture<BtxGlobalAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxGlobalAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxGlobalAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
