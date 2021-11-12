import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TodoComponent } from './todo/todo.component';
import { ContactComponent } from './contact/contact.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UsersComponent } from './users/users.component';

export const ROUTES: Routes = [

  {path:'home', component: HomeComponent},
  {path:'todos', component: TodoComponent},
  {path:'users', component: UsersComponent},
  {path:'contact', component: ContactComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'add-todo', component: AddTodoComponent},
  {path:'add-user', component: AddUserComponent},
  {path:'single-todo/:id', component: SingleTodoComponent},
  {path:'', component: TodoComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
