import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private server_url: string = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.server_url}/products`, product);
  }
  updateProduct(product: Product): Observable<Product> {
    console.log(product);
    return this.http.patch<Product>(`${this.server_url}/products`, product);
  }
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.server_url}/products`);
  }
  getProductByBarCode(barCode : String): Observable<Product> {
    return this.http.get<Product>(`${this.server_url}/products/barCode/{barCode}?_barCode=`+barCode);
  }
}
