import { Component, OnInit,Input } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

import {FormControl, Validators} from '@angular/forms';


//dados mattable
export interface Movie {
  id_genero:string;
  genero: string;
}
let ELEMENT_DATA: Movie[] = [
  {id_genero: '1',genero:'Terror'} ,
  {id_genero: '2',genero:'Drama'},
  {id_genero: '3',genero:'Comedia'} 
];




@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
  titulo="Cadastre os gêneros dos filmes";
  constructor() { }

  ngOnInit(): void {
  }

   
 //codigo mattable
 displayedColumns: string[] = ['genero','botao'];
 dataSource = new MatTableDataSource(ELEMENT_DATA);

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   console.log("filter")
 }


 //codigo input
 generoFormControl = new FormControl('', [
    Validators.required
  ]);

  public editarGenero(id:string){
    console.log(id)
  }

  public adicionarGenero(id_genero:string,_genero: string){
    //let genero1=_genero as genero;
    // this.generoFormControl.value;
    let genero=this.generoFormControl.value as string;
    console.log(this.generoFormControl.value)
    let elemento:Movie={id_genero,genero}
     ELEMENT_DATA.push(elemento);
     console.log(ELEMENT_DATA)
  }


}
