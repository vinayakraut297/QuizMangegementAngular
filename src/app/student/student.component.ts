import { Component } from '@angular/core';
import { StudentService } from '../student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  isLogin = true; // Flag to toggle between Login and Register

  loginData = {
    email: '',
    password: '',
    errorMessage: ''
  };

  registerData = {
    name: '',
    email: '',
    password: '',
    errorMessage: ''
  };

  constructor(private studentService: StudentService, private router: Router) { }

  showLogin() {
    this.isLogin = true;
  }

  showRegister() {
    this.isLogin = false;
  }

  
  onLoginSubmit() {
    console.log('Login Data:', this.loginData);

    this.studentService.loginStudent(this.loginData)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          window.alert("Login successful")
          this.router.navigate(['/student-dashboard']);  // Redirect to teacher dashboard
        },
        error => {
          console.error('Login error:', error);
          if (error.status === 401) {
            window.alert("Invalid email or password. Please try again.")
            this.registerData.errorMessage = 'Invalid email or password. Please try again.';
          } else {
            this.registerData.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      );
  }

  onRegisterSubmit() {
    console.log('Registration Data:', this.registerData);
    this.studentService.registerStudent(this.registerData)
      .subscribe(
        response => {
          console.log('Registration successful:', response);
          window.alert("Registration successful");
          this.isLogin = true;
        },
        error => {
          console.error('Registration error:', error);
          window.alert("Registration email already used or Registration error");
        }
      );
  }
}
