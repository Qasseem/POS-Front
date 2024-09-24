import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpService) {}

  getOpenTickets(data) {
    return this.http.postReq('/Dashboard/OpenTickets', data);
  }
  getTicketStats(data) {
    return this.http.postReq('/Dashboard/TicketStatistics', data);
  }
  getPerformance(data) {
    return this.http.postReq('/Dashboard/Performance', data);
  }
  exportPerformanceData(data) {
    return this.http.postReq('/Dashboard/ExportPerformance', data);
  }
}
