import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingProductsComponent } from './missing-products.component';

describe('MissingProductsComponent', () => {
  let component: MissingProductsComponent;
  let fixture: ComponentFixture<MissingProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissingProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
