import { Injectable } from '@angular/core';
import { Sale } from 'src/app/shared';
import jsreport from '@jsreport/browser-client';
import { SaleService } from '../sales/sale.service';

Object.assign(jsreport, {serverUrl: "http://localhost:5488"});

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor( private saleService : SaleService) { }

  async generateSaleReport(data: any) :Promise<any> {
      const report = await jsreport.render({
        template: {
          name: '/samples/Invoice/invoice-main'    
        },
        data: data
      });
      return report;   

    }
}
