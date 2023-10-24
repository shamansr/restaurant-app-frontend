import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(private http: HttpClient) {}

  logout(): Observable<any> {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Create HTTP headers with the token
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Define the API endpoint for logout
    const apiUrl = 'http://localhost:4000/v1/api/logout';
    // Send a POST request with the token in the headers
    return this.http.post(apiUrl, null, { headers });
  }
}
