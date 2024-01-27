import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../models/property';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get<Property>('http://26.67.212.119:3000/api/properties');
  }
  getById(id: string): Observable<any> {
    return this.http.get<Property>(`http://26.67.212.119:3000/api/property/` + id);
  }
}
