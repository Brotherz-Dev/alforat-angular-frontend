import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductTypeService } from 'src/app/services/productTypes/product-type.service';
import { Product, ProductType } from 'src/app/shared';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit ,AfterViewInit{

  productForm: FormGroup;

  product: Product;
  productTypes: ProductType[] = [];
  selected: any ;
  
  constructor(private formBuilder: FormBuilder, private productTypeService: ProductTypeService,
    private productService: ProductService,private changeDetectorRefs: ChangeDetectorRef, private notificationService: NotificationService, @Inject(MAT_DIALOG_DATA) public data: Product) {
    this.product = data;
    this.productForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      barCode: [data.barCode, Validators.required],
      buyingPrice: [data.buyingPrice],
      sellingPrice: [data.sellingPrice, [Validators.required ,Validators.min(0.1)]],
      description: [data.description],
      productType_id: [data.productType.id, Validators.required]
    })
  }
  ngAfterViewInit(): void {
     this.selected = this.productForm.value.type_id;
  }

  ngOnInit(): void {
    this.getProductTypes();
  }
  getProductTypes() {
    this.productTypeService.getProductTypes()
    .subscribe(data => {
      data.forEach(element => {
        return this.productTypes.push(element);
      });
      this.changeDetectorRefs.detectChanges();
    });

  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.updateProduct(this.productForm.value).subscribe({
        next: (res) => {
          this.notificationService.showSuccess('המוצר עודכן בהצלחה!','');
                },
        error: (err) => {
          if (err.status === 409) {
            this.notificationService.showError('שגיאה בעדכון המוצר!', '');
          }
          else {
            this.notificationService.showError('Unknown Error!', '');
          }
        }
      });
    }

  }
}
