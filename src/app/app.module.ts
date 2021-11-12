import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { TodoComponent } from "./todo/todo.component";
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TodoService } from "./services/todo.service";
import { NotFoundComponent } from './not-found/not-found.component';
import { SingleTodoComponent } from './single-todo/single-todo.component';
import { ContactComponent } from './contact/contact.component';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { AddTodoComponent } from './todo/add-todo/add-todo.component';
import {HttpClientModule} from '@angular/common/http';
import { ShopComponent } from './shop/shop.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './users/add-user/add-user.component';

/*export const ROUTES: Routes = [

  {path:'home', component: HomeComponent},
  {path:'todos', component: TodoComponent},
  {path:'contact', component: ContactComponent},
  {path:'not-found', component: NotFoundComponent},
  {path:'add-todo', component: AddTodoComponent},
  {path:'add-todo-reactive', component: AddTodoReactiveComponent},
  {path:'single-todo/:id', component: SingleTodoComponent},
  {path:'', component: TodoComponent},
  {path:'**', pathMatch: 'full', redirectTo: 'not-found' },
];*/

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HeaderComponent,
    NotFoundComponent,
    SingleTodoComponent,
    ContactComponent,
    AddTodoComponent,
    ShopComponent,
    UsersComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    //RouterModule.forRoot(ROUTES),
    AppRoutingModule,
  ],
  providers:[ TodoService],
  bootstrap:[
    AppComponent
  ]

})
export class AppModule {

}
