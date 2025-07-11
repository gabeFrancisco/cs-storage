import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtUpdateModalComponent } from './debt-update-modal.component';

describe('DebtUpdateModalComponent', () => {
  let component: DebtUpdateModalComponent;
  let fixture: ComponentFixture<DebtUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebtUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
