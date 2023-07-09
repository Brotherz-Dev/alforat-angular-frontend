import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'src/app/services/products/product.service';
import { Product } from 'src/app/shared';
import { AddProductComponent } from '../add-product/add-product.component';
import { UpdateProductComponent } from '../update-product/update-product.component';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','name', 'barCode', 'sellingPrice','buyingPrice','description','productType','actions'];

  datasource: MatTableDataSource<Product> = new MatTableDataSource<Product>();

  constructor(private productService:ProductService  ,private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { 
    
  }
  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getProducts();
   
  }

  addProduct() : void{
    const dialogRef = this.dialog.open(AddProductComponent, {
      width: '40%'
    }).afterClosed().subscribe(() => {
      this.getProducts();
    });

  }

  getProducts(){
    this.productService.getProducts()
      .subscribe(data => {
        console.log(data);
        this.datasource.data = data;
        this.changeDetectorRefs.detectChanges();
      });
    
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, {
      width: '40%',
      data: product
    }).afterClosed().subscribe(() => {
      this.getProducts();
    });
  }


}
