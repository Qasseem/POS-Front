import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterService {
  constructor(private http: HttpService) {}
  getDataWithPostCall(url) {
    return this.http.postReq(url, {
      pageSize: 1000,
      pageNumber: 0,
      searchCriteria: '',
      selectedId: [],
    });
  }

  getData(url) {
    return this.http.getReq(url);
  }

  getDataWithHeader(url, id) {
    return this.http.getHeaderReq(url, id);
  }
}
