import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable({
  providedIn: 'root',
})
export class PNgDropdownService {
  constructor(private http: HttpService) {}
  getData(url, searchOptions) {
    if (searchOptions.selectedId?.length) {
      var unique = searchOptions.selectedId.filter(this.onlyUnique);
      searchOptions.selectedId = unique;
    }

    return this.http.postReq(url, searchOptions);
  }
  getAllData(url) {
    return this.http.getReq(url);
  }
  private onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
}
