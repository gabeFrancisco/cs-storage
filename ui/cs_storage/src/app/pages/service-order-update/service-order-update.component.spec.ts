import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderUpdateComponent } from './service-order-update.component';

describe('ServiceOrderUpdateComponent', () => {
  let component: ServiceOrderUpdateComponent;
  let fixture: ComponentFixture<ServiceOrderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceOrderUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
