import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../app.module';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = 'http://localhost:3000/menu';

 constructor(private http: HttpClient) { }

 getOrder(): Observable<Order[]> {
  return this.http.get<Order[]>(this.apiUrl);
 }
 

  // delete$ = this.http.delete('http://localhost:3000/menu');
  // deleteOrder(menu: Order): Observable<Order> {
  //   const url = `${this.apiUrl}/${menu.id}`;
  //   return this.http.delete<Order>(url);
  // }
}
