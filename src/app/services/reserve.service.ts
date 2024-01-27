import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserve } from '../models/reserve';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private http: HttpClient) { }

  insert(objReserva: any): Observable<any>{
    return this.http.post<Reserve>("http://192.168.0.33:3000/api/reserve/", objReserva );
  }
}
