import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPostModalComponent } from './cash-post-modal.component';

describe('CashPostModalComponent', () => {
  let component: CashPostModalComponent;
  let fixture: ComponentFixture<CashPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CashPostModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
