import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class DirectiveService {
  constructor(private http: HttpService) {}

  checkExistence(data, url) {
    return this.http.postReq(url, data);
  }
}
