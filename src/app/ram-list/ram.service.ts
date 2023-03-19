import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ram } from './ram';

@Injectable({
  providedIn: 'root'
})
export class RamService {
  private baseUrl = 'http://localhost:8080/ram';

  constructor(private http: HttpClient) { }

  getRam(id: number): Observable<Ram> {
    return this.http.get<Ram>(`${this.baseUrl}/${id}`);
  }

  createRam(ram: Ram): Observable<Ram> {
    console.log(ram)
    return this.http.post<Ram>(this.baseUrl, ram);
  }

  updateRam(id: number, ram: Ram): Observable<Ram> {
    return this.http.put<Ram>(`${this.baseUrl}/${id}`, ram);
  }

  deleteRam(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getRamList(): Observable<Ram[]> {
    return this.http.get<Ram[]>(this.baseUrl);
  }
}

