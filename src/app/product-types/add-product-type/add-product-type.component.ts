import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification/notification.service';
import { ProductTypeService } from 'src/app/services/productTypes/product-type.service';

@Component({
  selector: 'app-add-product-type',
  templateUrl: './add-product-type.component.html',
  styleUrls: ['./add-product-type.component.css']
})
export class AddProductTypeComponent implements OnInit {

  productTypeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private productTypeService: ProductTypeService, private notificationService : NotificationService) {
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
            this.notificationService.showSuccess(`${this.productTypeForm.value.name} נוסף בהצלחה !`,'');
            this.productTypeForm.reset();
          },
          error: (err) => {
            if (err.status === 409) {
              this.notificationService.showError('המוצר כבר קיים!','');
            }
            else {
              this.notificationService.showError('Unknown Error!', '');
            }
          }
        });
    }
  }

}
