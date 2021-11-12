import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Todo } from "../models/todo.model";
import { TodoService } from "../services/todo.service";

@Component({
  selector: 'my-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit, OnDestroy{

  todos: Todo[] = []; //tableau qui va contenir des objets de type Todo
  today= new Date();
  //permet de faire recuperer l'observable Subjet.
  todosSub: Subscription = new Subscription;

  constructor(private todoService: TodoService, private router: Router){}


  //nous permet de savoir lorsque app est initialiser cad lorsque notre constructeur est realisé
  ngOnInit(){
    //recuperer les donnees lorsque app est lancé
    this.today = this.todoService.today;
    this.todosSub = this.todoService.todosSubjet.subscribe(
      (value:any[]) =>{
        this.todos = value;
      },
      (error) =>{
        console.log("Erreur: " +error);
      },
      ()=> {
        console.log("Observable complétée");
      }
    );
    this.todoService.emitTodos();
    //this.todos = this.todoService.todos;
    //cas Promise
    /*this.todoService.todos
      .then((todosResult: any)=>{
        this.todos = todosResult;
      }).catch((error: string)=>{
        console.log("Erreur: "+error);
      });*/

  }

  ngOnDestroy(): void {
    this.todosSub.unsubscribe;
  }
  OnChangeStatus(i:number){
    this.todoService.OnChangeStatus(i);
  }
  OnChangeIsModif(i:number){
    this.todoService.OnChangeIsModif(i);
  }
  onView(id: number){
    this.router.navigate(["single-todo", id]);
  }

}
