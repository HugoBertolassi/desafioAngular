import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';


import {MatTableDataSource} from '@angular/material/table';
import { User } from 'src/app/interface/usuario.interface';
import { GeralService } from 'src/app/service/geral-service/geral.service';
import { UsuarioService } from 'src/app/service/usuario-service/usuario.service';
import { EditarUsuarioDialogComponent } from 'src/app/view/editar-usuario-dialog/editar-usuario-dialog.component';



//dados mattable

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
export class UsuarioComponent implements OnInit,AfterViewInit {

  form!:FormGroup;
  titulo=`Faça o Cadastro de usuários e edite, caso necessário.
  Pronto para cadastrar?`;

  usuarios:User[]=[]
  error="Erro ao pegar os dados"
  @ViewChild(MatPaginator) paginator!: MatPaginator
  dataSource!:MatTableDataSource<User>;

  index:number=0;
  loading=this.geralService.loading;


  constructor(
   private formBuilder:FormBuilder,
   private usuarioService:UsuarioService,
   public dialog: MatDialog,
   private geralService:GeralService
   ) {
    }


  ngOnInit(): void {
    this.form=this.formBuilder.group({
      nomeForm:new FormControl('',[Validators.required]),
      emailForm:new FormControl('',[Validators.required,Validators.email]),
      telefoneForm:new FormControl('',[Validators.required]),
    })

    this.usuarioService.lerUsuarios().subscribe({
      next:(usuarios:User[])=>{
        this.usuarios=usuarios;
        this.atualizaTable()
      },
      error:()=>{
        console.log('Ero ao pegar os clientes')
      }
    })
  }

  salvarUsuario(){
    this.geralService.showLoading()
    let id=this.nextID()
    // const id=this.usuarios[(this.usuarios.length)-1].id+1;
    const usuario:User={
      id: id,
      name:this.form.controls['nomeForm'].value,
      email:this.form.controls['emailForm'].value,
      telefone:this.form.controls['telefoneForm'].value
    }

    this.usuarioService.salvarUsuario(usuario).subscribe({
      next:()=> {//nao precisa pegar parametro poque o metodo ja faz isso

        this.ngOnInit()
        this.geralService.hideLoading();
      },
      error:()=>{
        console.log('falha')
        this.geralService.hideLoading();
      }
    })
  }



  excluirUsuario(id:number){
    this.geralService.showLoading()
    this.usuarioService.excluirUsuario(id).subscribe({
      next:()=>{
        console.log("excluiu");
        this.ngOnInit();
        this.geralService.hideLoading();
      },
      error:()=>{
        console.log("erro ao excluir bolo");
        this.geralService.hideLoading();

      }
    })
  }

  //Validações
  validaEmail():string{
    //console.log(this.nome_form.controls["formEmail"].errors)
    if(this.form.controls["emailForm"].hasError('required')){
      return this.error;
    }
    else if(this.form.controls["emailForm"].hasError('email')){
      return 'e-mail invalido';
    }
    else{
      return ''
    }
  }

  nextID(){
    let maiorid=0
    //console.log(this.usuarios.length)
    for(let i=0;i<this.usuarios.length;i++){
      if(Number(this.usuarios[i].id)> maiorid){
        maiorid=Number(this.usuarios[i].id)
      }
    }
    maiorid++
    //console.log(maiorid)
    return (maiorid).toString()
  }

  //////////////////////table
  //codigo mattable
  displayedColumns: string[] = ['name', 'email', 'telefone','botao'];
  //a criacao da matatable foi dentro do ngoninit e criado a table

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log("filter")
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  ngAfterViewInit() {

  }

  atualizaTable(){
    this.dataSource = new MatTableDataSource(this.usuarios);//atualizar a tabelathis.dataSource = new MatTableDataSource(this.usuarios);//atualizar a tabela
    this.index=this.usuarios.length;
    this.dataSource.paginator = this.paginator;
    this.ngAfterViewInit()
  }

  //////////////////////////// dialog

  openDialog(id:number): void {
     let enterAnimationDuration="200ms";
     let exitAnimationDuration:"200ms"

    this.usuarioService.lerUsuariosById(id).subscribe({ //pegar bolo
      next:(element:User)=>{
        //abir o dialog
        const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
          width: '30%',
          enterAnimationDuration,
          exitAnimationDuration,
          data:{id:element.id,name:element.name,email:element.email,telefone:element.telefone}
        });

        //receber fechamento do dialog
        dialogRef.afterClosed().subscribe(element => {
          if(element){
            this.geralService.showLoading()
            this.usuarioService.updateUsuario(element).subscribe({
              next:()=>{
                this.geralService.hideLoading()
                this.ngOnInit()

              },
              error:()=>{
                this.geralService.hideLoading()
                 alert("Erro ao salvar usuario")
              }
            })
          }
        });
      },
      error:()=>{
        console.log("erro ao editar usuario");
      }
    })
  }

}
