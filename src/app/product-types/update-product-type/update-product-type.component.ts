import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductTypeService } from 'src/app/services/productTypes/product-type.service';
import { ProductType } from 'src/app/shared';

@Component({
  selector: 'app-update-product-type',
  templateUrl: './update-product-type.component.html',
  styleUrls: ['./update-product-type.component.css']
})
export class UpdateProductTypeComponent implements OnInit {

  productTypeForm: FormGroup;

  productType: ProductType;

  constructor(private formBuilder : FormBuilder, private productTypeService: ProductTypeService, private snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: ProductType) { 
    this.productType = data;
    this.productTypeForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      description: [data.description, Validators.required],
      
    })
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.productTypeService.updateProductType(this.productTypeForm.value).subscribe({
      next: (res) => {
        this.openSnackBar('Product Type updated succesfully!');
      },
      error: (err) => {
        if (err.status === 409) {
          this.openSnackBar('Error updating Product Type!', false);
        }
        else {
          this.openSnackBar('Unknown Error!', false);
        }
      }
    });

  }
  
  openSnackBar(message: string, success: boolean = true) {
    this.snackBar.open(message, undefined, {
      duration: 2000,
      panelClass: ['mat-toolbar', success? 'mat-primary': 'mat-warn']
    });
  }

}
