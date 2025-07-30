import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashRegisterTableComponent } from './cash-register-table.component';

describe('CashRegisterTableComponent', () => {
  let component: CashRegisterTableComponent;
  let fixture: ComponentFixture<CashRegisterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashRegisterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashRegisterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
