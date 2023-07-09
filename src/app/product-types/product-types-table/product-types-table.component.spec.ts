import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTypesTableComponent } from './product-types-table.component';

describe('ProductTypesTableComponent', () => {
  let component: ProductTypesTableComponent;
  let fixture: ComponentFixture<ProductTypesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductTypesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTypesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
