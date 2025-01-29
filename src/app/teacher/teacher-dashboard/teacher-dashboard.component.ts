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
    private router: Router) { }
  goToHome(): void {

    this.router.navigate(['/home']);
  }
  addAnotherQuestion(): void {
    this.quizData.questions.push({
      text: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
    });
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
        if (error.status === 400) {
          alert('This quiz already exists!');
        } else {
          alert('Error creating quiz. Please try again.');
        }
        console.error('Error creating quiz:', error);
      }
    );
  }


  onDeleteQuiz() {
    if (!this.quizData.title) {
      alert('Please enter a quiz title to delete.');
      return;
    }

    this.quizService.deleteQuizByTitle(this.quizData.title).subscribe(
      (response: any) => {
        alert('Quiz deleted successfully!');
        this.quizData.title = '';
      },
      (error: any) => {
        if (error.status === 500) {
          alert('This quiz contains questions, so it cannot be deleted!');
        }
        else if (error.status === 404) {
          alert('Quiz not found!');
        }
        else {
          alert('Error deleting quiz!');
        }
        console.error('Error:', error);
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
  resetQuizFields(): void {
    this.quizData = {
      title: '',
      description: '',
      questions: [
        { text: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
      ],
    };
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
