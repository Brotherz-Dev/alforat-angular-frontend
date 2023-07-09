import { Injectable } from '@angular/core';
import { Sale } from 'src/app/shared';

// Object.assign(jsreport, {serverUrl: "http://localhost:5488"});

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor() { }

  async generateSaleReport(sale : Sale)  {
    // const report = await jsreport.render({
    //   template: {
    //     name: '/samples/Invoice/invoice-main'    
    //   },
    //   data: {
    //     number : sale.id,
    //     seller :{
    //       "name" : "EasyShop",
    //       "road" : "The Heaven Road",
    //       "country" : "86199 Augsburg"
    //     },
    //     buyer:{
    //       "name": sale.customerName,
    //       "phoneNumber" : sale.phoneNumber
    //     },
    //     items : sale.saleStates
    //   }
    // });
    // return report;
    return null;
  }

}
