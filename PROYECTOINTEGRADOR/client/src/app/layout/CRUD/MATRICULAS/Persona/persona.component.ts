import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PersonaService } from './../../../../services/CRUD/MATRICULAS/persona.service';
import { Persona } from './../../../../models/MATRICULAS/Persona';
import { TipoPersonaService } from './../../../../services/CRUD/MATRICULAS/tipopersona.service';
import { TipoPersona } from './../../../../models/MATRICULAS/TipoPersona';
import { EstadoCivilService } from './../../../../services/CRUD/MATRICULAS/estadocivil.service';
import { EstadoCivil } from './../../../../models/MATRICULAS/EstadoCivil';
import { GeneroService } from './../../../../services/CRUD/MATRICULAS/genero.service';
import { Genero } from './../../../../models/MATRICULAS/Genero';
import { EstadoService } from './../../../../services/CRUD/MATRICULAS/estado.service';
import { Estado } from './../../../../models/MATRICULAS/Estado';

@Component({
   selector: 'app-persona',
   templateUrl: './persona.component.html',
   styleUrls: ['./persona.component.scss']
})
export class PersonaComponent implements OnInit {
   personas: Persona[] = [];
   personaSelected: Persona = new Persona();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   tipos_personas: TipoPersona[] = [];
   estados_civiles: EstadoCivil[] = [];
   generos: Genero[] = [];
   estados: Estado[] = [];
   constructor(
      private toastr: ToastrManager,
      private tipo_personaDataService: TipoPersonaService,
      private estado_civilDataService: EstadoCivilService,
      private generoDataService: GeneroService,
      private estadoDataService: EstadoService,
      private personaDataService: PersonaService) { }

   ngOnInit() {
      this.goToPage(1);
      this.getTipoPersona();
      this.getEstadoCivil();
      this.getGenero();
      this.getEstado();
   }

   selectPersona(persona: Persona) {
      this.personaSelected = persona;
   }

   getTipoPersona() {
      this.tipos_personas = [];
      this.tipo_personaDataService.get().then(r => {
         this.tipos_personas = r as TipoPersona[];
      }).catch(e => console.log(e));
   }

   getEstadoCivil() {
      this.estados_civiles = [];
      this.estado_civilDataService.get().then(r => {
         this.estados_civiles = r as EstadoCivil[];
      }).catch(e => console.log(e));
   }

   getGenero() {
      this.generos = [];
      this.generoDataService.get().then(r => {
         this.generos = r as Genero[];
      }).catch(e => console.log(e));
   }

   getEstado() {
      this.estados = [];
      this.estadoDataService.get().then(r => {
         this.estados = r as Estado[];
      }).catch(e => console.log(e));
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getPersonas();
   }

   getPersonas() {
      this.personas = [];
      this.personaSelected = new Persona();
      this.personaSelected.tipo_persona_id = 0;
      this.personaSelected.estado_civil_id = 0;
      this.personaSelected.genero_id = 0;
      this.personaSelected.estado_id = 0;
      this.personaDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.personas = r.data as Persona[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newPersona(content) {
      this.personaSelected = new Persona();
      this.personaSelected.tipo_persona_id = 0;
      this.personaSelected.estado_civil_id = 0;
      this.personaSelected.genero_id = 0;
      this.personaSelected.estado_id = 0;
      this.showDialog = true;
   }

   editPersona(content) {
      if (typeof this.personaSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deletePersona() {
      if (typeof this.personaSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.personaDataService.delete(this.personaSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getPersonas();
      }).catch(e => console.log(e));
   }



   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.personaSelected.id === 'undefined') {
         this.personaDataService.post(this.personaSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getPersonas();
         }).catch(e => console.log(e));
      } else {
         this.personaDataService.put(this.personaSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getPersonas();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}