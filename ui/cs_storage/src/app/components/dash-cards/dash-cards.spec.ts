import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCards } from './dash-cards';

describe('DashCards', () => {
  let component: DashCards;
  let fixture: ComponentFixture<DashCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
