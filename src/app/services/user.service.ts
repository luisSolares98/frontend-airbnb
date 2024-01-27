import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private users: User[] = [
    { id: 'b7edaef9-71af-4adf-a352-89d1d68443a2', password: '123456', email: 'pepe@example.com', nombre: 'pepe' },
    { id: '170d6f16-0d1f-4f8d-b5fc-9249bb851f89', password: '123456', email: 'pepe2@example.com', nombre: 'anita'},
  ];

  constructor() { }
  
  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  getUserById(id: string) {
    return of(this.users.find(user => user.id === id ));
  }

  login(email: string, pass: string): Observable<User | undefined> {
    return of(this.users.find(user => user.email === email && user.password === pass ));
  }

}
