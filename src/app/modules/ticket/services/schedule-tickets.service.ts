import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { APIURL } from 'src/app/services/api';

@Injectable({
  providedIn: 'root',
})
export class ScheduleTicketsService {
  constructor(private http: HttpService) {}

  getById(id) {
    return this.http.getReq(APIURL.Schedule.GetOne + id);
  }

  Block(data) {
    return this.http.postReq(APIURL.Schedule.Block, data);
  }
  getScheduleStatus() {
    return this.http.getReq(APIURL.Schedule.GetStatus);
  }
  getScheduleRecurrenceType() {
    return this.http.getReq(APIURL.Schedule.GetRecurrenceType);
  }
  getScheduleWeekDays() {
    return this.http.getReq(APIURL.Schedule.GetScheduleWeekDays);
  }
}
