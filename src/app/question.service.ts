  import { HttpClient, HttpParams } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { environment } from './environment';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root'
  })
  export class QuestionService {

    constructor(private http: HttpClient) { }
    private apiUrl = environment.apiUrl;

    getAllQuestions(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/question`);
    }

    getQuestionsByQuizTitle(quizTitle: string): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/api/question/title/${quizTitle}`);
    }

    submitAnswers(submission: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/api/quiz/submit`, submission,{ responseType: 'text' as 'json' });
    }

  getQuizResults(quizTitle: string, answersJson: string): Observable<any> {
    const params = new HttpParams()
      .set('quizTitle', quizTitle)
      .set('answersJson', answersJson);  
  
    return this.http.get<any>(`${this.apiUrl}/api/quiz/results`, { params });
  }
  

  }
