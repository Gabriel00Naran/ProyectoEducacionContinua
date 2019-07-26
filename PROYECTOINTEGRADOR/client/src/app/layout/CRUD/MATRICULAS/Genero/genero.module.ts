import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GeneroRoutingModule } from './genero-routing.module';
import { GeneroComponent } from './genero.component';
import { GeneroService } from './../../../../services/CRUD/MATRICULAS/genero.service';
import { environment } from 'src/environments/environment';

@NgModule({
   imports: [CommonModule,
             GeneroRoutingModule,
             FormsModule],
   declarations: [GeneroComponent],
   providers: [
               GeneroService
               ]
})
export class GeneroModule {}