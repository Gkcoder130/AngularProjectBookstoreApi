import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item.model';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = 'http://localhost:8090/books';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item);
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item);
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  searchItemsByTitle(title: string): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.apiUrl}/search/title/${title}`);
  }

  searchItemsByAuthor(author: string): Observable<Item[]> {
  return this.http.get<Item[]>(`${this.apiUrl}/search/author/${author}`);
  }
}
