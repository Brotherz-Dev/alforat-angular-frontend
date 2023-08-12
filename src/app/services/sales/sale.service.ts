import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSaleDTO, Sale, SaleDashboard } from 'src/app/shared';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleService {


  constructor(private http:HttpClient) { }

  postSale(sale: CreateSaleDTO): Observable<Sale> {
    return this.http.post<Sale>(`${environment.apiUrl}/sale/add`, sale);
  }
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${environment.apiUrl}/sales`);
  }
  getSalesDasboard(): Observable<SaleDashboard> {
    return this.http.get<SaleDashboard>(`${environment.apiUrl}/sales/dashboard`);
  }
  getSaleById(id : number): Observable<Sale> {
    return this.http.get<Sale>(`${environment.apiUrl}/sale/id/`+id);
  }
}
