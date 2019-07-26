import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InfoLaboralRoutingModule } from './infolaboral-routing.module';
import { InfoLaboralComponent } from './infolaboral.component';
import { InfoLaboralService } from './../../../../services/CRUD/MATRICULAS/infolaboral.service';
import { environment } from 'src/environments/environment';
import { PersonaService } from './../../../../services/CRUD/MATRICULAS/persona.service';

@NgModule({
   imports: [CommonModule,
             InfoLaboralRoutingModule,
             FormsModule],
   declarations: [InfoLaboralComponent],
   providers: [
               PersonaService,
               InfoLaboralService
               ]
})
export class InfoLaboralModule {}