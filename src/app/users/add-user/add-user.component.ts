import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  //lié le template ou formulaire avec notre logique
  userForm!: FormGroup;

  //injecter dans notre constructeur formBuilder
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.initUserForm();
  }

  initUserForm() {
    this.userForm = this.formBuilder.group({
      firstname: this.formBuilder.control("", [Validators.required,Validators.minLength(5)]),
      lastname: this.formBuilder.control("", [Validators.required,Validators.minLength(5)]),
      email: this.formBuilder.control("",[Validators.required,Validators.email,Validators.minLength(5)]),
      description: this.formBuilder.control("", [Validators.required,Validators.minLength(10)]),
      dateBirth: this.formBuilder.control("",Validators.required),

      address: this.formBuilder.group({
        street: this.formBuilder.control("",Validators.required),
        state: this.formBuilder.control("", Validators.required),
        city: this.formBuilder.control("", Validators.required),
        zip: this.formBuilder.control("", Validators.required),
      }),
      aliases: this.formBuilder.array([]) //pour l'instant tableau vide
    });
  }

  //Méthode qui va permettre a l'utilisateur d'obtenir le tableau de control qui va retourner un FormArray
  getAliases(): FormArray{
    return this.userForm.get("aliases") as FormArray;
  }

  // Méthode qui va permettre a l'utilisateur d'ajouter un champ  ou un control a ce tableau
  addAliases():void{
    this.getAliases().push(this.formBuilder.control("", Validators.required));
  }

  onSubmit():void{
    //stocher les donnés receuillis du formulaire dans une variable.
    const dataUser = this.userForm.value;
    console.log(dataUser);
    const address = new Address(dataUser.street, dataUser.city,dataUser.state,dataUser.zip);
    const alias = dataUser.aliases? dataUser.aliases : []; // voir si nous avions alias  dans dataUser si oui intégré dans la creation des utilisateur,regarder datauser faire un controle, si non faire un tableau vide
    const newUser = new User(
      dataUser.firstname,
       dataUser.lastname,
       dataUser.email,
       address,   //dataUser.address,
       dataUser.description,
       dataUser.dateBirth,
       alias
       );
       this.userService.addUser(newUser);
      this.router.navigate(["/users"]);
    //console.log(dataUser.firstname);
  }

}
