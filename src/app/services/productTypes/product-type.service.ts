import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductType } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductTypeService {


  constructor(private http:HttpClient) { }

  postProductType(productType: ProductType): Observable<ProductType> {
    return this.http.post<ProductType>(`${environment.apiUrl}/producttype/add`, productType);
  }
  updateProductType(productType: ProductType): Observable<ProductType> {
    console.log(productType);
    return this.http.patch<ProductType>(`${environment.apiUrl}/producttype/update`, productType);
  }
  getProductTypes(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(`${environment.apiUrl}/producttype/all`);
  }
}
