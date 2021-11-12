import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { User } from '../models/user.model';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: User[] = [];

  /* variable qui va contenir notre abonnement déjà disponible sur les données  ou récupérer l’observable ou les valeurs
   après le detruire*/
   /* variable qui va contenir notre abonnement déjà disponible sur les données  ou récupérer l’observable ou les valeurs
   après le detruire*/
  usersSusbcription!: Subscription;


  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    //this.users= this.userService.users; //user est disponible on poura utiliser sur notre template

    /*maintenant qu'on a les donnees sur forme de subject recuperer pour afficher dans le template comme c'est un observable
    faire un subscribe decu, recuperer les donnees dans un tableau appelé userRecup et mettre dans this.users. maintenant
     tout ceci mettre dans une suscription pour pouvoir  destruire après*/
    this.usersSusbcription = this.userService.usersSubject.subscribe((userRecup: User[]) =>{
      this.users = userRecup;
    });
    this.userService.emitUsers();
  }

  ngOnDestroy():void{
    this.usersSusbcription.unsubscribe();
  }

}
