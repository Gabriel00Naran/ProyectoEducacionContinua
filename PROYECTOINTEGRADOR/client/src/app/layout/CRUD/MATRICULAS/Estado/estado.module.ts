import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoRoutingModule } from './estado-routing.module';
import { EstadoComponent } from './estado.component';
import { EstadoService } from './../../../../services/CRUD/MATRICULAS/estado.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             EstadoRoutingModule,
             FormsModule],
   declarations: [EstadoComponent],
   providers: [
               EstadoService
               ]
})
export class EstadoModule {}