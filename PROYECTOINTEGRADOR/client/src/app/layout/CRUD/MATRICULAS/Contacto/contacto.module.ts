import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactoRoutingModule } from './contacto-routing.module';
import { ContactoComponent } from './contacto.component';
import { ContactoService } from './../../../../services/CRUD/MATRICULAS/contacto.service';
import { environment } from 'src/environments/environment';
import { PersonaService } from './../../../../services/CRUD/MATRICULAS/persona.service';

@NgModule({
   imports: [CommonModule,
             ContactoRoutingModule,
             FormsModule],
   declarations: [ContactoComponent],
   providers: [
               PersonaService,
               ContactoService
               ]
})
export class ContactoModule {}