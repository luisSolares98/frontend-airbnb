import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnsplashService {
  private apiUrl = 'https://api.unsplash.com/photos/random';
  // private accessKey = 'gyiAnnKxLBDLdLEe_q6kS6H2Fa_LzDYVGZUmGutIbxw';

  constructor(private http: HttpClient) { }

  getRandomHouseImage(cantidadImg: number): Observable<any> {
    const params = {
      query: 'house',
      orientation: 'landscape',
      count: cantidadImg,
      // client_id: this.accessKey
    };

    return this.http.get(this.apiUrl, { params });
  }
}
