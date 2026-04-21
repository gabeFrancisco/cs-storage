import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreationModalComponent } from './product-creation-modal.component';

describe('ProductCreationModalComponent', () => {
  let component: ProductCreationModalComponent;
  let fixture: ComponentFixture<ProductCreationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCreationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCreationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
