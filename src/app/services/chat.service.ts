import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private http: HttpClient) { }

  insertChat(obj: any): Observable<any>{
    return this.http.post<any>("http://192.168.0.33:3000/api/chat/", obj );
  }
  
}
