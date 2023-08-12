import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification/notification.service';
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

  constructor(private formBuilder : FormBuilder, private productTypeService: ProductTypeService, private notificationService : NotificationService, @Inject(MAT_DIALOG_DATA) public data: ProductType) { 
    this.productType = data;
    this.productTypeForm = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      description: [data.description],
      
    })
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.productTypeService.updateProductType(this.productTypeForm.value).subscribe({
      next: (res) => {
        this.notificationService.showSuccess('סוג המוצר עודכן בהצלחה!','');
      },
      error: (err) => {
        if (err.status === 409) {
          this.notificationService.showError('כבר קיים!','');
        }
        else {
          this.notificationService.showError('Unknown Error!', '');
        }
      }
    });

  }

}
