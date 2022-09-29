import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarGeneroDialogComponent } from './editar-genero-dialog.component';

describe('EditarGeneroDialogComponent', () => {
  let component: EditarGeneroDialogComponent;
  let fixture: ComponentFixture<EditarGeneroDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarGeneroDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarGeneroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
