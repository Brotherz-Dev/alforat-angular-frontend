
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { ReportService } from 'src/app/services/reporting/report.service';

import { SaleService } from 'src/app/services/sales/sale.service';
import { Sale, SaleState } from 'src/app/shared';

@Component({
  selector: 'app-sales-table',
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.css']
})
export class SalesTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns: string[] = ['name', 'barCode', 'price', 'count', 'calculatedPrice'];

  datasource: MatTableDataSource<SaleState> = new MatTableDataSource<SaleState>();
  states: SaleState[] = [];
  
  sale : Sale | undefined;
  sucessAudio: HTMLAudioElement;
  errorAudio: HTMLAudioElement;


  constructor(private saleService: SaleService, private snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef
    , private formBuilder: FormBuilder, private reportService:ReportService) {

      this.sucessAudio = new Audio();
      this.sucessAudio.src = "../../../assets/Barcode-scanner-beep-sound.mp3";
      this.errorAudio = new Audio()
      this.errorAudio.src = "../../../assets/error-sound-effect.mp3";

  }
  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {

  }

  applyFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value;
    this.saleService.getSaleById(input)
    .subscribe({
      next: (value) => {
        this.sucessAudio.load();
        this.sucessAudio.play();
        this.sale = value;
        this.datasource.data = this.sale.saleStates;
        console.log(this.datasource.data);
      },
      error: (err) => {
        this.errorAudio.load();
        this.errorAudio.play();
        if (err.status === 404) {
          this.sale = undefined;
          this.openSnackBar('Sale Not Found', false);
        }
        else {
          this.sale = undefined;
          this.openSnackBar('Unknown Error!', false);
        }
      }
      
    });
  }
  openSnackBar(message: string, success: boolean = true) {
    this.snackBar.open(message, undefined, {
      duration: 4000,
      panelClass: ['mat-toolbar', success ? 'mat-primary' : 'mat-warn']
    });
  }


  getDateFormat(row: string) {
    let newDate = new Date(row);
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(newDate, 'M/d/yy, h:mm a');
  }


  calculateTotal() {
    if(this.sale === undefined)
    return 0;
    const x = this.sale?.saleStates.map(t => t.price * t.count).reduce((acc, value) => acc + value, 0);
    return x.toFixed(2);
  }
  calculatePrice(state: SaleState) {
    const price = state.price * state.count;
    if (price > 0) {
      return price.toFixed(2);
    }
    return 0;
  }


}

