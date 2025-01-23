import { Component } from '@angular/core';
import { QuizService } from '../quiz.service';
import { Quiz } from '../quiz.model';

@Component({
  selector: 'app-about-quiz',
  templateUrl: './about-quiz.component.html',
  styleUrls: ['./about-quiz.component.css']
})
export class AboutQuizComponent {
 quizzes: Quiz[] = []; 

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.quizService.getAllQuizzes().subscribe(
      (data) => (this.quizzes = data),
      (error) => console.error('Error fetching quizzes:', error)
    );
  }
}
