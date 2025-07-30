import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtPostModalComponent } from './debt-post-modal.component';

describe('DebtPostModalComponent', () => {
  let component: DebtPostModalComponent;
  let fixture: ComponentFixture<DebtPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DebtPostModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DebtPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
