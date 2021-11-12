import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Todo } from "../models/todo.model";

// Injectable permet d'utiliser d'autre service de notre application. es si nous devons gerer les donnees des utilisateurs
@Injectable({
  providedIn:'root'
})
export class TodoService{

  //donnees en dur
  today = new Date();
  todos!: Todo[];
  todoSlice:any;
  //nous permet de definir un observable dans lequel on va pouvoir faire entrer des donnees, specifier le typ de donnees
  todosSubjet= new Subject<any[]>();

  //communication vers les serveurs
  constructor(private httpClient: HttpClient){
    this.getTodosFromServer();
   /* setTimeout(() =>{
      this.todos = [
      {
        todoName: "projet 1",
        todoStatus: true,
        image:"http://placeimg.com/150/150/tech",
        description:"Lorem Ipsum a commencé comme un latin brouillé",
        isModif:false
      },
      {
        todoName: "projet 2",
        todoStatus: false,
        image:"http://placeimg.com/150/150/architecture",
        description:"Lorem Ipsum a commencé comme un latin brouillé",
        isModif:false
      },
      {
        todoName: "projet 3",
        todoStatus: true,
        image:"http://placeimg.com/150/150/animals",
        description:"Lorem Ipsum a commencé comme un latin brouillé",
        isModif:false
      },
      {
        todoName: "projet 4",
        todoStatus: false,
        image:"http://placeimg.com/150/150/nature",
        description:"Lorem Ipsum a commencé comme un latin brouillé",
        isModif:false
      }
    ];
    this.emitTodos();
  },3000);
  */
   /* const lastUpdate = Promise.resolve(new Date());
     //const lastUpdate2 = Promise.reject(new Date());
    this.todos= new Promise((resolve,reject)=>{
      const data: any=[
        {
          todoName: "projet 1",
          todoStatus: true,
          image:"http://placehold.it/150",
          description:"Lorem Ipsum a commencé comme un latin brouillé",
          isModif:false
        },
        {
          todoName: "projet 2",
          todoStatus: false,
          image:"http://placehold.it/150",
          description:"Lorem Ipsum a commencé comme un latin brouillé",
          isModif:false
        },
        {
          todoName: "projet 3",
          todoStatus: true,
          image:"http://placehold.it/150",
          description:"Lorem Ipsum a commencé comme un latin brouillé",
          isModif:false
        },
        {
          todoName: "projet 4",
          todoStatus: false,
          image:"http://placehold.it/150",
          description:"Lorem Ipsum a commencé comme un latin brouillé",
          isModif:false
        }

      ];
      //tester si ces données existe, voir si la longeur di tableau est > à 0
      if(data.length){
         setTimeout(()=>{
           this.todoSlice = data;
          resolve(data);
         },2000);
      }else{
          reject('pas de données disponible  sur le serveur');
      }

   });*/


  }

addTodo(todo:Todo):void{
  //this.todos.push(todo); //ajouter a la fin du tableau
  this.todos.unshift(todo); //ajouter au debut du tableau
  /*this.httpClient.post("https://todo-list-app-27ebb-default-rtdb.firebaseio.com/todos.json", todo).subscribe(() =>{

  console.log(todo);
    this.emitTodos();
    this.saveTodosFromServer();
 });*/
 this.emitTodos();
 this.saveTodosFromServer();
}
/*envoie les donnees a notre observable, next permet denvoyer une valeur a notre Observable et c'est cette la qui
 doit nous permettre de faire notre abonnement la decus*/
emitTodos(){
  this.todosSubjet.next(this.todos);

}

  /*prend le tableau objet que nous avons,  //prend l'element qui est a la position i et change son status.
  prendre le status et mettre le contraire de sa valeur*/
  OnChangeStatus(i:number){
    this.todos[i].todoStatus = !this.todos[i].todoStatus;
    //this.todoSlice[i].todoStatus = !this.todoSlice[i].todoStatus;
    this.emitTodos();
    this.saveTodosFromServer();
  }

  OnChangeIsModif(i:number){
    this.todos[i].isModif = !this.todos[i].isModif;
    //this.todoSlice[i].isModif = !this.todoSlice[i].isModif;
    this.emitTodos();
    this.saveTodosFromServer();

  }

  getTodo(index:number){
    if(this.todos[index]){ // verifie si index existe et retourne l'element que nous avons a cet index
      return this.todos[index];
    }
    return false;
  }
  //put verifie si les données sont déja sur le serveur si ou ca les ecrase
  saveTodosFromServer():void{
    this.httpClient.put('https://todo-list-app-27ebb-default-rtdb.firebaseio.com/todos.json', this.todos)
    .subscribe(
      ()=>{
      console.log('Données enregistrés avec sucess!');
    }),
    (error: any)=>{
      console.log('Erreur de sauvegarde: ' + error);
    };
  }

  getTodosFromServer(){
    this.httpClient.get<Todo[]>('https://todo-list-app-27ebb-default-rtdb.firebaseio.com/todos.json').subscribe((todoRecup:Todo[])=>{
      this.todos = todoRecup;
      this.emitTodos(); //signale qu'il y a eu de changements afin d'ajouter le template
    },
    (error)=>{
      console.log("Erreur de récupération des données: " + error);
    },
    ()=>{
      console.log("Récupération des données terminée");
    }
    );
  }

}
