import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatriculaRoutingModule } from './matricula-routing.module';
import { MatriculaComponent } from './matricula.component';
import { MatriculaService } from './../../../../services/CRUD/MATRICULAS/matricula.service';
import { environment } from 'src/environments/environment';
import { CursoService } from './../../../../services/CRUD/MATRICULAS/curso.service';
import { PersonaService } from './../../../../services/CRUD/MATRICULAS/persona.service';
import { EstadoService } from './../../../../services/CRUD/MATRICULAS/estado.service';

@NgModule({
   imports: [CommonModule,
             MatriculaRoutingModule,
             FormsModule],
   declarations: [MatriculaComponent],
   providers: [
               CursoService,
               PersonaService,
               EstadoService,
               MatriculaService
               ]
})
export class MatriculaModule {}