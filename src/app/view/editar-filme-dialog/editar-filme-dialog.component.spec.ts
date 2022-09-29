import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFilmeDialogComponent } from './editar-filme-dialog.component';

describe('EditarFilmeDialogComponent', () => {
  let component: EditarFilmeDialogComponent;
  let fixture: ComponentFixture<EditarFilmeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarFilmeDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarFilmeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
