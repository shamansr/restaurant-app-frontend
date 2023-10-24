import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PostService {

  constructor(private httpClient: HttpClient) { }

  saveContent(content: string): Observable<any> {

    const token = localStorage.getItem('token')

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const apiUrl = 'http://localhost:4000/v1/api/feed'
    return this.httpClient.post(apiUrl, { content } , { headers })
  }
}
