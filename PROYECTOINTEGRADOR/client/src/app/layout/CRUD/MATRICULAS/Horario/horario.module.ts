import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HorarioRoutingModule } from './horario-routing.module';
import { HorarioComponent } from './horario.component';
import { HorarioService } from './../../../../services/CRUD/MATRICULAS/horario.service';
import { environment } from 'src/environments/environment';
import { TipoPersonaService } from './../../../../services/CRUD/MATRICULAS/tipopersona.service';

@NgModule({
   imports: [CommonModule,
             HorarioRoutingModule,
             FormsModule],
   declarations: [HorarioComponent],
   providers: [
               TipoPersonaService,
               HorarioService
               ]
})
export class HorarioModule {}