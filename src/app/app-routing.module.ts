import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeacherComponent } from './teacher/teacher.component';
import { StudentComponent } from './student/student.component';
import { TeacherDashboardComponent } from './teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './student/student-dashboard/student-dashboard.component';
import { QuestionComponent } from './question/question.component';
import { AboutQuizComponent } from './about-quiz/about-quiz.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'teacher', component: TeacherComponent },
  { path: 'teacher-dashboard', component: TeacherDashboardComponent },
  { path: 'student', component: StudentComponent },
  { path: 'student-dashboard', component: StudentDashboardComponent },
  { path: 'about-quiz', component: AboutQuizComponent },
  { path: 'questions/:title', component: QuestionComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
