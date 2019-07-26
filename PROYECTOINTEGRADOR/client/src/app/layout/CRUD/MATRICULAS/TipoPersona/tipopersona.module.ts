import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TipoPersonaRoutingModule } from './tipopersona-routing.module';
import { TipoPersonaComponent } from './tipopersona.component';
import { TipoPersonaService } from './../../../../services/CRUD/MATRICULAS/tipopersona.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             TipoPersonaRoutingModule,
             FormsModule],
   declarations: [TipoPersonaComponent],
   providers: [
               TipoPersonaService
               ]
})
export class TipoPersonaModule {}