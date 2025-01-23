import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  registerTeacher(teacherData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/teacher/register`, teacherData, { responseType: 'text' as 'json' });
  }

  loginTeacher(teacherData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/teacher/login`, teacherData, { responseType: 'text' as 'json' });
  }

}
