import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(private http:HttpClient) { }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${environment.apiUrl}/product/add`, product);
  }
  updateProduct(product: Product): Observable<Product> {
    console.log(product);
    return this.http.patch<Product>(`${environment.apiUrl}/product/update`, product);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiUrl}/product/all`);
  }
  getProductByBarCode(barCode : String): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/product/search?barCode=`+barCode);
  }
}
