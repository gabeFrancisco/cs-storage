import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingProductsModalComponent } from './missing-products-modal.component';

describe('MissingProductsModalComponent', () => {
  let component: MissingProductsModalComponent;
  let fixture: ComponentFixture<MissingProductsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissingProductsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingProductsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
