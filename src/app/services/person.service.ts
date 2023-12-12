import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(private http: HttpClient) {}

  getPersonList(): Observable<Person[]> {
    return this.http.get<Person[]>(`http://localhost:8080/person/get/all`);
  }

  getPerson(id:any): Observable<Person> {
    return this.http.get<Person>(`http://localhost:8080/person/get/`+id);
  }

  public save(data: any) {
    return this.http.post(`http://localhost:8080/person/save`, data, {
      observe: 'response',
    });
  }

  public delete(id: any) {
    return this.http.delete(`http://localhost:8080/person/delete/` + id, {
      observe: 'response',
    });
  }
}
