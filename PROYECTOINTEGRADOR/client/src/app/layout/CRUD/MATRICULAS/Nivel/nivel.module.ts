import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NivelRoutingModule } from './nivel-routing.module';
import { NivelComponent } from './nivel.component';
import { NivelService } from './../../../../services/CRUD/MATRICULAS/nivel.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             NivelRoutingModule,
             FormsModule],
   declarations: [NivelComponent],
   providers: [
               NivelService
               ]
})
export class NivelModule {}