import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashUpdateModalComponent } from './cash-update-modal.component';

describe('CashUpdateModalComponent', () => {
  let component: CashUpdateModalComponent;
  let fixture: ComponentFixture<CashUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
