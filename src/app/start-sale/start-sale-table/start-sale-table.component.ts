import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/products/product.service';
import { Product,SaleState} from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sales/sale.service';
import { ReportService } from 'src/app/services/reporting/report.service';


@Component({
  selector: 'app-start-sale-table',
  templateUrl: './start-sale-table.component.html',
  styleUrls: ['./start-sale-table.component.css']
})


export class StartSaleTableComponent implements OnInit {

  datasource: MatTableDataSource<SaleState> = new MatTableDataSource<SaleState>();
  states: SaleState[] = [];
  displayedColumns: string[] = ['name', 'barCode', 'price', 'count', 'calculatedPrice', 'actions'];
  sucessAudio: HTMLAudioElement;
  errorAudio: HTMLAudioElement;
  lastAddedProductIndex: number = -1;
  loading = false;

  saleId: number = -1;
  
  saleForm: FormGroup;

  constructor(private productService: ProductService, private snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef
    , private formBuilder: FormBuilder, private saleService:SaleService , private reportService:ReportService) {
    this.sucessAudio = new Audio();
    this.sucessAudio.src = "../../../assets/Barcode-scanner-beep-sound.mp3";
    this.errorAudio = new Audio()
    this.errorAudio.src = "../../../assets/error-sound-effect.mp3";

    this.saleForm = this.formBuilder.group({
      customerName: [''],
      phoneNumber: [''],
      saleStates: this.datasource.data,
    })

  }
  ngOnInit(): void {

  }

  searchProduct(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.productService.getProductByBarCode(input)
      .subscribe({
        next: (value) => {
          this.sucessAudio.load();
          this.sucessAudio.play();
          this.addProductToArray(value);
          this.datasource.data = this.states;
          this.changeDetectorRefs.detectChanges();
        },
        error: (err) => {
          this.errorAudio.load();
          this.errorAudio.play();
          if (err.status === 404) {
            this.openSnackBar('Product Not Found', false);
          }
          else {
            this.openSnackBar('Unknown Error!', false);
          }
        }
      });
  }
  addProductToArray(p: Product) {
    let added = false;
    this.states.forEach((element, i) => {
      if (p.barCode === element.barCode) {
        element.count = element.count + 1;
        added = true;
        this.lastAddedProductIndex = i;
        return;
      }
    });
    if (added) {
      return;
    }
    const state: SaleState = {
      product_id: p.id,
      name: p.name,
      barCode: p.barCode,
      price: p.sellingPrice,
      count: 1
    };
    this.states.push(state);
    this.lastAddedProductIndex = this.states.length - 1;
    return;
  }
  openSnackBar(message: string, success: boolean = true) {
    this.snackBar.open(message, undefined, {
      duration: 4000,
      panelClass: ['mat-toolbar', success ? 'mat-primary' : 'mat-warn']
    });
  }

  calculateTotal() {
    const x = this.states.map(t => t.price * t.count).reduce((acc, value) => acc + value, 0);
    return x.toFixed(2);
  }
  removeProduct(state: SaleState) {
    const index = this.states.indexOf(state, 0);
    if (index > -1) {
      this.states.splice(index, 1);
    }
    this.datasource.data = this.states;
    this.changeDetectorRefs.detectChanges();
  }
  calculatePrice(state: SaleState) {
    const price = state.price * state.count;
    if (price > 0) {
      return price.toFixed(2);
    }
    return 0;
  }

  saveSale(): void {
    this.loading = true;
    this.saleForm.value.saleStates = this.datasource.data;
    console.log(this.saleForm.value);
    if(this.saleForm.value.saleStates === undefined  || this.saleForm.value.saleStates.length === 0){
      this.openSnackBar("Should be at least one Item !",false);
      this.loading=false;
      return;

    }
      this.saleService.postSale(this.saleForm.value)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.openSnackBar(`Sale added successfully! !`);
            this.saleId = res.id;
            this.loading=true;
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
      this.loading=false;

  }
  async generateSaleReport(){
    console.log(this.saleForm.value);
    if(this.saleId == -1){
      this.openSnackBar('Sale must be saved first!' , false);
      return;
    }
    // (await this.reportService.generateSaleReport({...this.saleForm.value, "id": this.saleId})).download(`report-${new Date().toISOString()}.pdf`);
  }
}
