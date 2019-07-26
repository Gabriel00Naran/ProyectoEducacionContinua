import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadoCivilRoutingModule } from './estadocivil-routing.module';
import { EstadoCivilComponent } from './estadocivil.component';
import { EstadoCivilService } from './../../../../services/CRUD/MATRICULAS/estadocivil.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             EstadoCivilRoutingModule,
             FormsModule],
   declarations: [EstadoCivilComponent],
   providers: [
               EstadoCivilService
               ]
})
export class EstadoCivilModule {}