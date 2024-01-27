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

  getChatsHost(hostId: string): Observable<any>{
    return this.http.get<any>(`http://192.168.0.33:3000/api/chat/host/${hostId}`);
  }

  getChatsGuest(guestId: string): Observable<any>{
    return this.http.get<any>(`http://192.168.0.33:3000/api/chat/guest/${guestId}`);
  }

  getMessagesRefresh(uuid: string): Observable<any> {
    return this.http.get(`http://147.182.253.73:4000/message/${uuid}`);
  }

  getMessages(uuid: string): Observable<any> {
    return this.http.get(`http://147.182.253.73:4000/message/${uuid}`);
  }

}
