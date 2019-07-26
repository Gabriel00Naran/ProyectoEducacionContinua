import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalidadRoutingModule } from './modalidad-routing.module';
import { ModalidadComponent } from './modalidad.component';
import { ModalidadService } from './../../../../services/CRUD/MATRICULAS/modalidad.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             ModalidadRoutingModule,
             FormsModule],
   declarations: [ModalidadComponent],
   providers: [
               ModalidadService
               ]
})
export class ModalidadModule {}