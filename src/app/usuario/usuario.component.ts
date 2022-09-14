import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';



//dados mattable
export interface User {
  id:string;
  name: string;
  email:string;
  telefone:string;
}
const ELEMENT_DATA: User[] = [
  {id: '1', name: 'Paulo Andre', email: 'Paulo@123.com', telefone: '33496788'},
  {id: '2', name: 'Joao Andre', email: 'adsasdas@gmail.com', telefone: '33496788'},
];



//component
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  constructor() { }

  titulo=`Faça o Cadastro de usuários e edite, caso necessário.
  Pronto para cadastrar?`;
  
  ngOnInit(): void {
  }

  //codigo mattable
  displayedColumns: string[] = ['name', 'email', 'telefone','botao'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("filter")
  }

  
 //codigo input
 textFieldFormControl = new FormControl('', [
  Validators.required
]);
}