import { Observable } from 'rxjs';
import { GeneroInterface } from 'src/app/interface/genero.interface';
import { GeneroService } from './../../service/genero-service/genero.service';
import { FilmeInterface } from './../../interface/filme.interface';
import { FilmeService } from './../../service/filme-service/filme.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { EditarFilmeDialogComponent } from 'src/app/view/editar-filme-dialog/editar-filme-dialog.component';
import { GeralService } from 'src/app/service/geral-service/geral.service';





// //dados mattable
 export interface FilmeGenero {
   id:number;
   nome: String;
   id_genero:number
   genero:String;
 }


@Component({
  selector: 'app-filme',
  templateUrl: './filme.component.html',
  styleUrls: ['./filme.component.scss']
})
export class FilmeComponent implements OnInit {
  titulo="Cadastre os filmes de sua preferência"
  loading=this.geralService.loading;
  error="Erro ao pegar os dados"
  dataSource!:MatTableDataSource<FilmeInterface>;
  index:number=0;
  form!:FormGroup;
  filmes:FilmeInterface[]=[];
  generos:GeneroInterface[]=[]
  filmeGenero!:any[]//FilmeGenero[]

  constructor(
    private formBuilder:FormBuilder,
    private filmeService:FilmeService,
    private generoService:GeneroService,
    public dialog: MatDialog,
    private geralService:GeralService
  ) {}

  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nomeForm:new FormControl('',[Validators.required]),
      genderSelect:new FormControl('',[Validators.required])
    })


        this.filmeService.lerFilmes().subscribe({
          next:(objects:FilmeInterface[])=>{
            this.filmes=objects;
            this.generoService.lerGeneros().subscribe({
              next:(objects:GeneroInterface[])=>{
                this.generos=objects;
                this.createGeneroFilmeData2.subscribe({
                  next:()=>{
                    this.atualizaTable()
                    console.log(this.filmeGenero)

                  }
                })
              },
              error:()=>{
                console.log('Erro ao listar filme')
              }
            })
          },
          error:()=>{
            console.log('Erro ao listar filme')
          }
        })



    //console.log(this.filmeGenero)

  }
  ///////////////////////////////////
  //CRUD
  salvarFilme(){
    this.geralService.showLoading()
    //const id=this.filmes[(this.filmes.length)-1].id+1;
    const id=this.nextID()
    const nom1=this.form.controls['genderSelect'].value;
    //const id_genero=
    //this.createGeneroFilmeData()
   // console.log(nom1)
    const filme:FilmeInterface={
      id: id,
      nome:this.form.controls['nomeForm'].value,
      id_genero:nom1//this.form.controls['']
    }

    this.filmeService.salvarFilme(filme).subscribe({
      next:()=>{
        this.geralService.hideLoading();
        this.ngOnInit();
      },
      error:()=>{
        console.log("erro ao salvar filme");
        this.geralService.hideLoading();
      }
    })
  }
  nextID(){
    let maiorid=0
    for(let i=0;i<this.filmes.length;i++){
      if(Number(this.filmes[i].id)> maiorid){
        maiorid=Number(this.filmes[i].id)
      }
    }
    maiorid++
    return (maiorid)
  }

  excluirFilme(id:number){
    this.geralService.showLoading()
    this.filmeService.excluirFilme(id).subscribe({
      next:()=>{
        console.log("excluiu");
        this.createGeneroFilmeData();
        this.ngOnInit();
        this.geralService.hideLoading();
      },
      error:()=>{
        console.log("erro ao excluir filme");
        this.geralService.hideLoading();
      }
    })
  }

  editarFilme(element:FilmeGenero){
    this.openDialog(element)
  }

  createGeneroFilmeData(){
    this.filmeGenero=[];
    for(let i=0; i<this.filmes.length;i++){
      //console.log(this.filmes[i].id_genero)
      this.generoService.lerGenerosById(this.filmes[i].id_genero).subscribe({
        next:(object:GeneroInterface)=>{
          let genero={genero:object.genero}
          let filme:any =this.filmes[i]
          this.filmeGenero[i]={...filme,...genero}//criacao do objeto filme mais genero
          //console.log(this.filmeGenero)

        },
        error:()=>{
          console.log('Erro ao pegar objeto genero. O Genero deste registro foi apagado')
        }
      })
    }
   }

   createGeneroFilmeData2=new Observable(()=>{
    //link para cmo criar obsevable https://www.koderhq.com/tutorial/angular/observable/#:~:text=The%20simplest%20way%20to%20create%20an%20observable%20in,can%20be%20a%20reference%20to%20a%20standalone%20function.

      //console.log("inicindo observable")

      this.filmeGenero=[];
      for(let i=0; i<this.filmes.length;i++){
        //console.log(this.filmes[i].id_genero)
        this.generoService.lerGenerosById(this.filmes[i].id_genero).subscribe({
          next:(object:GeneroInterface)=>{
            let genero={genero:object.genero}
            let filme:any =this.filmes[i]
            this.filmeGenero[i]={...filme,...genero}//criacao do objeto filme mais genero
            //console.log(this.filmeGenero)
            this.atualizaTable()
          },
          error:()=>{
            console.log('Erro ao pegar objeto genero. O Genero deste registro foi apagado')
          }
        })
      }
  })

  //Opcoes de genero
//  generos: string[] = [
//    'Terror', 'CComedia', 'Drama'
//  ];

//////////////////////////////////////////////////////////
 //codigo mattable
 displayedColumns: string[] = ['movie','genero','botao'];
 //dataSource = new MatTableDataSource(ELEMENT_DATA);

 applyFilter(event: Event) {
   const filterValue = (event.target as HTMLInputElement).value;
   this.dataSource.filter = filterValue.trim().toLowerCase();
   if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
 }

 @ViewChild(MatPaginator) paginator!: MatPaginator
 ngAfterViewInit() {
  // this.dataSource.paginator = this.paginator;
 }

 atualizaTable(){
   //this.dataSource = new MatTableDataSource(this.filmes);//atualizar a tabelathis.dataSource = new MatTableDataSource(this.usuarios);//atualizar a tabela
   this.dataSource = new MatTableDataSource(this.filmeGenero);//atualizar a tabelathis.dataSource = new MatTableDataSource(this.usuarios);//atualizar a tabela
   this.index=this.filmes.length;
   this.dataSource.paginator = this.paginator;
   this.ngAfterViewInit()
 }

  // //codigo input
  // textFieldFormControl = new FormControl('', [
  //   Validators.required
  // ]);

  ////Dialog
  openDialog(element:FilmeGenero): void {
    let enterAnimationDuration='500ms';
    let exitAnimationDuration='500ms';
    //abrir o dialog
    const dialogRef = this.dialog.open(EditarFilmeDialogComponent, {
      width: '30%',
      enterAnimationDuration,
      exitAnimationDuration,
      data:{id:element.id,nome:element.nome,id_genero:element.id_genero,genero:element.genero}
      })
      //receber fechamento do dialog

    dialogRef.afterClosed().subscribe(element => {
      if(element){
        this.geralService.showLoading()
        this.filmeService.updateFilme(element).subscribe({
          next:()=>{
            this.ngOnInit()
            this.geralService.hideLoading()
        },
          error:()=>{
            alert("Erro ao salvar filme")
          }
        })
      }
    })
  }
}
