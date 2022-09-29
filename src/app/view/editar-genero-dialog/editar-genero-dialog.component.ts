import { GeneroInterface } from 'src/app/interface/genero.interface';
import { GeneroService } from './../../service/genero-service/genero.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-genero-dialog',
  templateUrl: './editar-genero-dialog.component.html',
  styleUrls: ['./editar-genero-dialog.component.scss']
})
export class EditarGeneroDialogComponent implements OnInit {
  public form!:FormGroup

  constructor(
    public formbuilder:FormBuilder,
    public dialogRef: MatDialogRef<EditarGeneroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data:GeneroInterface ,
    public userService:GeneroService
    ) { }

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      id:['',[Validators.required]],
      genero:['',[Validators.required]],
    })

    this.form.controls['id'].setValue(this.data.id);
    this.form.controls['genero'].setValue(this.data.genero);

  }

  updateElement(){
    this.data.id=this.form.controls['id'].value;
    this.data.genero=this.form.controls['genero'].value;

    this.dialogRef.close(this.data);
    this.form.reset()
  }
  onNoClick(): void {
    this.dialogRef.close();
    this.form.reset()
  }
}
