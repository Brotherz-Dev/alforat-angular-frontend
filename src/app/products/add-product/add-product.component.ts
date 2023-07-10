import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductService } from 'src/app/services/products/product.service';
import { ProductTypeService } from 'src/app/services/productTypes/product-type.service';
import { ProductType } from 'src/app/shared';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm: FormGroup;
  productTypes: ProductType[] = [];

  constructor(private formBuilder: FormBuilder, private productService: ProductService,
    private productTypeService: ProductTypeService, private changeDetectorRefs: ChangeDetectorRef, private snackBar: MatSnackBar) {
    this.productForm = this.formBuilder.group({
      barCode: ['', Validators.required],
      name: ['', Validators.required],
      buyingPrice: [0],
      sellingPrice: [0, [Validators.required,Validators.min(0.1)]],
      description: [''],
      productType_id:['',Validators.required]
    })

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
        console.log(data);
        this.changeDetectorRefs.detectChanges();
      });
  }
  onSubmit(): void {
    console.log(this.productForm.value);
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productService.postProduct(this.productForm.value)
        .subscribe({
          next: (res) => {
            this.openSnackBar(`${this.productForm.value.name} added successfully! !`);
            this.productForm.reset();
          },
          error: (err) => {
            if (err.status === 409) {
              this.openSnackBar('Already found in database!', false);
            }
            else {
              this.openSnackBar('Unknown Error!', false);
            }
          }
        });
    }
  }

  openSnackBar(message: string, success: boolean = true) {
    this.snackBar.open(message, undefined, {
      duration: 4000,
      panelClass: ['mat-toolbar', success ? 'mat-primary' : 'mat-warn']
    });
  }
  get productType() {
    return this.productForm.get('typeId');
  }

}
