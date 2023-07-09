import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale, SaleDashboard } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  private server_url: string = 'http://localhost:8000';

  constructor(private http:HttpClient) { }

  postSale(sale: Sale): Observable<Sale> {
    return this.http.post<Sale>(`${this.server_url}/sales`, sale);
  }
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.server_url}/sales`);
  }
  getSalesDasboard(): Observable<SaleDashboard> {
    return this.http.get<SaleDashboard>(`${this.server_url}/sales/dashboard`);
  }
  getSaleById(id : String): Observable<Sale> {
    return this.http.get<Sale>(`${this.server_url}/sales/`+id);
  }
}
