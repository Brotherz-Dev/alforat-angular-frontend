import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {

  private server_url: string = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  postProductType(productType: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(`${this.server_url}/productTypes`, productType);
  }
  updateProductType(productType: ProductType): Observable<ProductType> {
    console.log(productType);
    return this.http.patch<ProductType>(`${this.server_url}/productTypes`, productType);
  }
  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${this.server_url}/productTypes`);
  }
}
