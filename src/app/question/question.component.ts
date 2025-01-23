
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../question.service';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  quizTitle: string = '';
  selectedOption: { [key: number]: number } = {}; // Store selected options by question ID
  currentIndex: number = 0; // Track the index of the current question
  quizResult: any = null; // Store the result of the quiz

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.quizTitle = this.route.snapshot.paramMap.get('title')!;
    this.fetchQuestionsByTitle();
  }

  goToHome(): void {

    this.router.navigate(['/home']);
  }


  fetchQuestionsByTitle(): void {
    this.questionService.getQuestionsByQuizTitle(this.quizTitle).subscribe(
      (data) => {
        this.filteredQuestions = data;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  selectOption(question: any, index: number): void {
    this.selectedOption[question.id] = index; // Store selected option by question ID
  }

  submitAnswers(): void {
    const payload = {
      quizTitle: this.quizTitle,
      answers: this.selectedOption, // Send selected options
    };

    console.log('Submitting payload:', payload);
    this.questionService.submitAnswers(payload).subscribe({
      next: (response: any) => {
        console.log('Server Response:', response);
        this.quizResult = response; // Ensure server sends expected structure
        console.log(this.quizResult);
        alert('Quiz submitted successfully!');
      },
      error: (error) => {
        alert('Please answer all questions before submitting.');
        console.error('Error submitting answers:', error);
      },
    });
  }


  resetQuiz(): void {
    if (confirm('Are you sure you want to reset the quiz?')) {
      console.log('Reset Quiz triggered');
      this.selectedOption = {};
      this.quizResult = null;
      this.currentIndex = 0;
    }
  }

  SeeResult(): void {
    const answersJson = JSON.stringify(this.selectedOption);
    const params = new HttpParams()
      .set('quizTitle', this.quizTitle)
      .set('answersJson', answersJson);

    console.log('Requesting results with:', { quizTitle: this.quizTitle, answersJson });

    this.questionService.getQuizResults(this.quizTitle, answersJson).subscribe({
      next: (response: any) => {
        console.log('Quiz Results:', response);
        this.quizResult = response;
        alert('Results fetched successfully!');
      },
      error: (error) => {
        console.error('Error fetching results:', error);
        alert('Failed to fetch results. Please try again.');
      },
    });
  }




  nextQuestion(): void {
    if (this.currentIndex < this.filteredQuestions.length - 1) {
      this.currentIndex++;
    }
  }

  previousQuestion(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }
}
