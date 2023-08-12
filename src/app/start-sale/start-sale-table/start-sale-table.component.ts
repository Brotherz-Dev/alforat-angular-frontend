import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/products/product.service';
import {
  CreateSaleDTO,
  CreateSaleStateDTO,
  Product,
  Sale,
  SaleState,
} from 'src/app/shared';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SaleService } from 'src/app/services/sales/sale.service';
import { ReportService } from 'src/app/services/reporting/report.service';

@Component({
  selector: 'app-start-sale-table',
  templateUrl: './start-sale-table.component.html',
  styleUrls: ['./start-sale-table.component.css'],
})
export class StartSaleTableComponent implements OnInit {
  datasource: MatTableDataSource<CreateSaleStateDTO> =
    new MatTableDataSource<CreateSaleStateDTO>();
  states: CreateSaleStateDTO[] = [];
  displayedColumns: string[] = [
    'name',
    'barCode',
    'price',
    'count',
    'calculatedPrice',
    'actions',
  ];
  sucessAudio: HTMLAudioElement;
  errorAudio: HTMLAudioElement;
  lastAddedProductIndex: number = -1;
  loading = false;

  showCustomerInputs = false;

  addProductManual = false;

  saleId: number = -1;
  sale : Sale | undefined ;

  saleForm: FormGroup;

  productFormManual: FormGroup;

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private changeDetectorRefs: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private saleService: SaleService,
    private reportService: ReportService
  ) {
    this.sucessAudio = new Audio();
    this.sucessAudio.src = '../../../assets/Barcode-scanner-beep-sound.mp3';
    this.errorAudio = new Audio();
    this.errorAudio.src = '../../../assets/error-sound-effect.mp3';

    this.productFormManual = this.formBuilder.group({
      price: [0, Validators.required],
      name: ['', Validators.required]
    });

    this.saleForm = this.formBuilder.group({
      customerName: [''],
      customerPhoneNumber: [''],
      customerId: [''],
      customerCity: [''],
    });
  }
  ngOnInit(): void { }
  showCustomerData() {
    this.showCustomerInputs = !this.showCustomerInputs;
  }

  addManualProductDisplay() {
    this.addProductManual = !this.addProductManual;
  }

  searchProduct(input: string) {
    // const input = (event.target as HTMLInputElement).value;
    this.productService.getProductByBarCode(input).subscribe({
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
        } else {
          this.openSnackBar('Unknown Error!', false);
        }
      },
    });
  }
  addProductToArray(p: Product) {
    let added = false;
    this.states.forEach((element, i) => {
      if (p.id === element.productId) {
        element.quantity = element.quantity + 1;
        added = true;
        this.lastAddedProductIndex = i;
        return;
      }
    });
    if (added) {
      return;
    }
    const state: CreateSaleStateDTO = {
      productId: p.id,
      productBarCode: p.barCode,
      quantity: 1,
      productName: p.name,
      price: p.sellingPrice,
    };
    this.states.push(state);
    this.lastAddedProductIndex = this.states.length - 1;
    return;
  }
  addManualProduct(name: string, price: number) {
    const state: CreateSaleStateDTO = {
      quantity: 1,
      productName: name,
      price: price,
    };
    this.states.push(state);
    this.lastAddedProductIndex = this.states.length - 1;
    return;
  }
  openSnackBar(message: string, success: boolean = true) {
    this.snackBar.open(message, undefined, {
      duration: 4000,
      panelClass: ['mat-toolbar', success ? 'mat-primary' : 'mat-warn'],
    });
  }

  calculateTotal() {
    const x = this.states
      .map((t) => t.price * t.quantity)
      .reduce((acc, value) => acc + value, 0);
    return x.toFixed(2);
  }
  removeProduct(state: CreateSaleStateDTO) {
    const index = this.states.indexOf(state, 0);
    if (index > -1) {
      this.states.splice(index, 1);
    }
    this.datasource.data = this.states;
    this.changeDetectorRefs.detectChanges();
  }
  calculatePrice(state: CreateSaleStateDTO) {
    const price = state.price * state.quantity;
    if (price > 0) {
      return price.toFixed(2);
    }
    return 0;
  }

  saveSale(): void {
    this.loading = false;
    this.saleForm.value.saleStates = this.datasource.data;
    if (
      this.saleForm.value.saleStates === undefined ||
      this.saleForm.value.saleStates.length === 0
    ) {
      this.openSnackBar('Should be at least one Item !', false);
      this.loading = false;
      return;
    }
    const createSaleDto = {} as CreateSaleDTO;
    createSaleDto.saleStates = this.states;
    createSaleDto.customerName = this.saleForm.get('customerName')?.value;
    createSaleDto.customerId = this.saleForm.get('customerId')?.value;
    createSaleDto.customerPhoneNumber = this.saleForm.get('customerPhoneNumber')?.value;
    createSaleDto.customerCity = this.saleForm.get('customerCity')?.value;
    this.saleService.postSale(createSaleDto).subscribe({
      next: (res) => {
        this.openSnackBar(`Sale added successfully! !`);
        this.saleId = res.id;
        this.sale = res;
        this.loading = true;
      },
      error: (err) => {
        if (err.status === 409) {
          this.openSnackBar('Already found in database!', false);
        } else {
          this.openSnackBar('Unknown Error!', false);
        }
      },
    });
    this.loading = false;
  }
  async generateSaleReport() {
    if (this.saleId == -1 || this.sale=== undefined) {
      this.openSnackBar('Sale must be saved first!', false);
      return;
    }
    this.saleService.getSaleById(this.saleId).subscribe(async (data) =>{
      if(!data){
        this.openSnackBar('Error',false);
        return;
      }
      (await this.reportService.generateSaleReport(data)).download(`report-${new Date().toISOString()}.pdf`);})
  }

  barCodeListener = '';

  isBarcodeListining = true;

  toggleBarcodeListener(): void {
    this.isBarcodeListining = !this.isBarcodeListining;
  }

  disableBarCodeListener(): void {
    this.isBarcodeListining = false;
  }

  enableBarCodeListener(): void {
    this.isBarcodeListining = true;
  }

  addString(str: string): void {
    this.barCodeListener = this.barCodeListener + str;
  }

  clearResult(): void {
    this.barCodeListener = '';
  }



  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.isBarcodeListining) {
      if (event.key == 'Enter') {
        this.searchProduct(this.barCodeListener);
        this.clearResult();
      } else if ("0123456789".includes(event.key)) {
        this.addString(event.key);
      }
    }
  }

  onQuantityChanges(event: Event, state: CreateSaleStateDTO) {
    this.clearResult();
    const input = (event.target as HTMLInputElement).value;
    this.states.forEach((element, i) => {
      if (state.productId === element.productId) {
        element.quantity = Number(input);
        return;
      }
    });
  }
  onPriceChangeChanges(event: Event, state: CreateSaleStateDTO) {
    this.clearResult();
    const input = (event.target as HTMLInputElement).value;
    this.states.forEach((element, i) => {
      if (state.productId === element.productId) {
        element.price = Number(input);
        return;
      }
    });
  }
}
