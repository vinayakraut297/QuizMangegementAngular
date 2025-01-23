import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { FormsModule } from '@angular/forms';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { QuestionComponent } from './question/question.component';
import { AboutQuizComponent } from './about-quiz/about-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    StudentComponent,
    HomeComponent,
    TeacherDashboardComponent,
    StudentDashboardComponent,
    QuestionComponent,
    AboutQuizComponent
    ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
