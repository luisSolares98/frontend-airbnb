import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reserve } from '../models/reserve';
import { Observable } from 'rxjs';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private http: HttpClient) { }

  insert(objReserva: any): Observable<any>{
    return this.http.post<Reserve>("http://192.168.0.33:3000/api/reserve/", objReserva );
  }
  
  getByUserId(id: any) : Observable<any>{
    return this.http.get<Property[]>("http://26.67.212.119:3000/api/reserve/users/"+ id );
  }
}
