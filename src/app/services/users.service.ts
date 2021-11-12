import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  //récupérer les utilisateurs de notre base de donné
  users: User[] = [];

  /*l’observable  subject doit nous permettre de recevoir les infos de la base de donné
  l'idéal serait de mettre un subject  comme ca on va pouvoir faire un abonnement sur ce subject ainsi lorsqu’il y aura
   des changements notre template pourra se mettre à jour de manière dynamique*/
   usersSubject = new Subject<User[]>();   // prend un tableau d'utilisateur dans la base de donné, on le declare et initialise avec new

   constructor() { }

  //créer une methode pour emettre ce subjet
  emitUsers():void{
    this.usersSubject.next(this.users);
  }

  addUser(user:User):void{
    this.users.push(user);
    this.emitUsers();
  }
}
