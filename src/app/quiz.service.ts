import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})

export class QuizService {

  private apiUrl = environment.apiUrl;
  // private baseUrl = `${environment.apiUrl}/api/quiz`;

  constructor(private http: HttpClient) { }

  createQuiz(quizData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/quiz/create`, quizData, { responseType: 'text' as 'json' });
  }

  addQuiz(quizData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/quiz/addQuiz`, quizData, );
  }
  getAllQuizzes(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/quiz/getAll`);
  }
  getQuizDetails(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/quiz/${quizId}`);
  }

  getQuizquestions(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/question/${quizId}`);
  }
  addQuizByTitle(quizData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/quiz/addQuizByTitle`, quizData, { responseType: 'text' as 'json' });
  }



}
