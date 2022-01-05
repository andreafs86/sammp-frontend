import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtxNavbarNavigationComponent } from './btx-navbar-navigation.component';

describe('BtxNavbarNavigationComponent', () => {
  let component: BtxNavbarNavigationComponent;
  let fixture: ComponentFixture<BtxNavbarNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtxNavbarNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtxNavbarNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
