import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductTypeService } from 'src/app/services/productTypes/product-type.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  productTypeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productTypeService: ProductTypeService, private snackBar: MatSnackBar) {
    this.productTypeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['']
    })

  }

  ngOnInit(): void {
    
  }
  onSubmit(): void {
    if (this.productTypeForm.valid) {
      this.productTypeService.postProductType(this.productTypeForm.value)
        .subscribe({
          next: (res) => {
            this.openSnackBar(`${this.productTypeForm.value.name} Added Succesfully !`);
            this.productTypeForm.reset();
          },
          error: (err) => {
            if (err.status === 409) {
              this.openSnackBar('Already Found in Database', false);
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

}
