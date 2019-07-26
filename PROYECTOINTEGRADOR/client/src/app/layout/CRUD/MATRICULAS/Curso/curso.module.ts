import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CursoRoutingModule } from './curso-routing.module';
import { CursoComponent } from './curso.component';
import { CursoService } from './../../../../services/CRUD/MATRICULAS/curso.service';
import { environment } from 'src/environments/environment';
import { ModalidadService } from './../../../../services/CRUD/MATRICULAS/modalidad.service';
import { NivelService } from './../../../../services/CRUD/MATRICULAS/nivel.service';
import { HorarioService } from './../../../../services/CRUD/MATRICULAS/horario.service';

@NgModule({
   imports: [CommonModule,
             CursoRoutingModule,
             FormsModule],
   declarations: [CursoComponent],
   providers: [
               ModalidadService,
               NivelService,
               HorarioService,
               CursoService
               ]
})
export class CursoModule {}