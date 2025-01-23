import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { QuizService } from 'src/app/quiz.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css'],
})
export class TeacherDashboardComponent {
  quizData = {
    title: '',
    description: '',
    questions: [
      { text: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
    ],
  };

  newQuestionText: string = '';
  newQuestionOptions: string[] = ['', '', '', ''];
  newCorrectAnswerIndex: number = 0;

  constructor(private quizService: QuizService,
      private router: Router) {}
  goToHome(): void {

    this.router.navigate(['/home']);
  }
  
  onCreateQuiz() {
    this.quizService.createQuiz(this.quizData).subscribe(
      (response) => {
        alert('Quiz created successfully!');
        this.quizData = {
          title: '',
          description: '',
          questions: [
            { text: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
          ],
        };
      },
      (error) => {
        console.error('Error creating quiz:', error);
      }
    );
  }

  onDeleteQuiz() {
    this.quizService.createQuiz(this.quizData).subscribe(
      (response) => {
        alert('Quiz deleted successfully!');
        this.quizData = {
          title: '',
          description: '',
          questions: [
            { text: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
          ],
        };
      },
      (error) => {
        console.error('Error deleting quiz:', error);
      }
    );
  }

  addQuestion(): void {
    const questionData = {
      title: this.quizData.title, // Title of the quiz
      text: this.newQuestionText,
      options: this.newQuestionOptions,
      correctAnswerIndex: this.newCorrectAnswerIndex,
    };

    this.quizService.addQuizByTitle(questionData).subscribe(
      (response) => {
        alert('Question added successfully');
        console.log('Question added successfully', response);
      },
      (error) => {
        alert('Error adding question');
        console.error('Error adding question:', error);
      }
    );
  }

  submitQuiz() {
    this.quizService.addQuiz(this.quizData).subscribe(
      (response) => {
        console.log('Quiz created successfully:', response);
      },
      (error) => {
        console.error('Error creating quiz:', error);
      }
    );
  }
}
