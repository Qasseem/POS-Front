import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  getCustomers(options): Observable<any> {
    const data: any[] = [];
    for (let i = 1; i <= 10; i++) {
      const item = {
        id: i,
        name: `Property1 ${i}`,
        country: `Property2 ${i}`,
        company: `Property3 ${i}`,
        representative: `Property4 ${i}`,
        prop5: `Property5 ${i}`,
        prop6: `Property6 ${i}`,
        prop7: `Property7 ${i}`,
        prop8: `Property8 ${i}`,
        prop9: `Property9 ${i}`,
      };
      data.push(item);
    }
    // Return an Observable of the generated data
    return of({ data, totalRecords: 1000 });
  }

  constructor() {}
}
