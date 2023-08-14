import { Injectable } from '@angular/core';
import { Sale } from 'src/app/shared';
import jsreport from '@jsreport/browser-client';
import { SaleService } from '../sales/sale.service';
import { environment } from 'src/environments/environment';

Object.assign(jsreport, {serverUrl: environment.jsreportURL});

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
