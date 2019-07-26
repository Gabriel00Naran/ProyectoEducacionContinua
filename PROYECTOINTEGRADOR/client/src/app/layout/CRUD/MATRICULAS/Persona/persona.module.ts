import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersonaRoutingModule } from './persona-routing.module';
import { PersonaComponent } from './persona.component';
import { PersonaService } from './../../../../services/CRUD/MATRICULAS/persona.service';
import { environment } from 'src/environments/environment';
import { TipoPersonaService } from './../../../../services/CRUD/MATRICULAS/tipopersona.service';
import { EstadoCivilService } from './../../../../services/CRUD/MATRICULAS/estadocivil.service';
import { GeneroService } from './../../../../services/CRUD/MATRICULAS/genero.service';
import { EstadoService } from './../../../../services/CRUD/MATRICULAS/estado.service';

@NgModule({
   imports: [CommonModule,
             PersonaRoutingModule,
             FormsModule],
   declarations: [PersonaComponent],
   providers: [
               TipoPersonaService,
               EstadoCivilService,
               GeneroService,
               EstadoService,
               PersonaService
               ]
})
export class PersonaModule {}