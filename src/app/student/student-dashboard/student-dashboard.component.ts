import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/quiz.model';
import { QuizService } from 'src/app/quiz.service';
import { StudentService } from 'src/app/student.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})

export class StudentDashboardComponent implements OnInit {
  username: string = '';
  quizzes: Quiz[] = [];

  constructor(private quizService: QuizService, private studentService: StudentService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.studentService.getUsername();
    this.quizService.getAllQuizzes().subscribe(
      (data) => (this.quizzes = data),
      (error) => console.error('Error fetching quizzes:', error)
    );
  }

  goToHome(): void {

    this.router.navigate(['/home']);
  }

}