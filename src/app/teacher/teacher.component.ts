import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent {
  isLogin = true;

  registerData = {
    email: '',
    password: '',
    name: '',
    errorMessage: ''
  };

  loginData = {
    email: '',
    password: ''
  };

  constructor(private teacherService: TeacherService, private router: Router) { }

  showLogin() {
    this.isLogin = true;
  }

  showRegister() {
    this.isLogin = false;
  }

  onSubmit() {
    console.log('Login Data:', this.loginData);

    this.teacherService.loginTeacher(this.loginData)
      .subscribe(
        response => {
          console.log('Login successful:', response);
          window.alert("Login successful")
          this.router.navigate(['/teacher-dashboard']);
        },
        error => {
          console.error('Login error:', error);
          window.alert("Invalid email or password. Please try again.")
          // Handle error message based on status code
          if (error.status === 401) {
            this.registerData.errorMessage = 'Invalid email or password. Please try again.';
          } else {
            this.registerData.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      );
  }

  onRegisterSubmit() {
    console.log('Registration Data:', this.registerData);
    this.teacherService.registerTeacher(this.registerData)
      .subscribe(
        response => {
          console.log('Registration successful:', response);
          window.alert("Registration successful")
          this.isLogin = true;
        },
        error => {
          console.error('Registration error:', error);
          window.alert("Registration email already used or Registration error")
          this.registerData.errorMessage = 'Registration failed. Please try again.';
        }
      );
  }
}
