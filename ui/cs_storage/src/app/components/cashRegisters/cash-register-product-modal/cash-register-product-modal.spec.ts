import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterProductModal } from './cash-register-product-modal';

describe('CashRegisterProductModal', () => {
  let component: CashRegisterProductModal;
  let fixture: ComponentFixture<CashRegisterProductModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashRegisterProductModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashRegisterProductModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
