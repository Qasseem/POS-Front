import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ScheduleTicketsService {
  constructor(private http: HttpService) {}
  getById(id) {
    return this.http.getReq('/Schedule/GetById/' + id);
  }

  Block(data) {
    return this.http.postReq('/Schedule/Block', data);
  }

  getScheduleStatus() {
    return this.http.getReq('/Schedule/GetScheduleStatus');
  }

  getScheduleRecurrenceType() {
    return this.http.getReq('/Schedule/GetScheduleRecurrenceType');
  }

  getScheduleWeekDays() {
    return this.http.getReq('/Schedule/GetScheduleDaysOfWeek');
  }

  getScheduleTickets(body) {
    return this.http.postReq('/Schedule/GetScheduleTickets', body);
  }
}
