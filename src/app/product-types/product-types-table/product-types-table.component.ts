import { Component, OnInit, ViewChild, ChangeDetectorRef } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ProductTypeService } from "src/app/services/productTypes/product-type.service";
import { ProductType } from "src/app/shared";
import { AddProductTypeComponent } from "../add-product-type/add-product-type.component";
import { UpdateProductTypeComponent } from "../update-product-type/update-product-type.component";


@Component({
  selector: 'app-product-types-table',
  templateUrl: './product-types-table.component.html',
  styleUrls: ['./product-types-table.component.css']
})
export class ProductTypesTableComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','name','description','actions'];

  datasource: MatTableDataSource<ProductType> = new MatTableDataSource<ProductType>();

  constructor(private productTypeService:ProductTypeService  ,private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef) { 
    
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getProductTypes();
   
  }

  addProductType() : void{
    const dialogRef = this.dialog.open(AddProductTypeComponent, {
      width: '40%'
    }).afterClosed().subscribe(() => {
      this.getProductTypes();
    });

  }

  getProductTypes(){
    this.productTypeService.getProductTypes()
      .subscribe(data => {
        this.datasource.data = data;
        console.log(data);
        this.changeDetectorRefs.detectChanges();
      });
      
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

 
  editProductType(productType: ProductType): void {
    const dialogRef = this.dialog.open(UpdateProductTypeComponent, {
      width: '40%',
      data: productType
    }).afterClosed().subscribe(() => {
      this.getProductTypes();
    });
  }
  


}
