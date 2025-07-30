import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingProductsTableComponent } from './missing-products-table.component';

describe('MissingProductsTableComponent', () => {
  let component: MissingProductsTableComponent;
  let fixture: ComponentFixture<MissingProductsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MissingProductsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MissingProductsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
