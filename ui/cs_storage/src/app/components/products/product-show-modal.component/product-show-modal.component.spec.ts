import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductShowModalComponent } from './product-show-modal.component';

describe('ProductShowModalComponent', () => {
  let component: ProductShowModalComponent;
  let fixture: ComponentFixture<ProductShowModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductShowModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductShowModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
