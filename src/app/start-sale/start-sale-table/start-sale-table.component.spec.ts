import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartSaleTableComponent } from './start-sale-table.component';

describe('StartSaleTableComponent', () => {
  let component: StartSaleTableComponent;
  let fixture: ComponentFixture<StartSaleTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartSaleTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartSaleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
