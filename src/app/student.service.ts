import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private username: string = '';
  private apiUrl = environment.apiUrl ;

  constructor(private http: HttpClient) { }

  registerStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/student/register`, studentData, { responseType: 'text' as 'json' });
  }
  loginStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/student/login`, studentData, { responseType: 'text' as 'json' });
  }

  // loginStudent(studentData: any): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/api/student/login`, studentData)
  //     .pipe(
  //       map((response: any) => {
  //         if (response && response.username) {
  //           this.setUsername(response.username); // Set the username
  //         }
  //         return response;
  //       })
  //     );
  // }

  getUsername(): string {
    return this.username;
  }
  setUsername(username: string): void {
    this.username = username;
  }
}
