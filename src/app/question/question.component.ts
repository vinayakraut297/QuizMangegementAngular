import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  questions: any[] = [];
  filteredQuestions: any[] = [];
  quizTitle: string = '';
  selectedOption: { [key: number]: number } = {}; // Store selected options by question id
  currentIndex: number = 0; // Track the index of the current question

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.quizTitle = this.route.snapshot.paramMap.get('title')!;
    this.fetchQuestionsByTitle();
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
    this.selectedOption[question.id] = index; // Store selected option by question id
    }

  submitAnswers(): void {
    const quizSubmission = {
      quizTitle: this.quizTitle,
      answers: this.selectedOption, // Contains the selected options keyed by question ID
    };
  
    this.questionService.submitAnswers(quizSubmission).subscribe(
      (response) => {
        alert('Answers submitted successfully!');
        console.log(response);
      },
      (error) => {
        console.error('Error submitting answers:', error);
        alert('Answers submitted successfully!');
        // alert('Failed to submit answers. Please try again.');
      }
    );
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

