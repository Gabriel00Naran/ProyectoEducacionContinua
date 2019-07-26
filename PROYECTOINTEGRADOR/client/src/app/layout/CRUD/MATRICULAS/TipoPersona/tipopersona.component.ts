import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { TipoPersonaService } from './../../../../services/CRUD/MATRICULAS/tipopersona.service';
import { TipoPersona } from './../../../../models/MATRICULAS/TipoPersona';

@Component({
   selector: 'app-tipopersona',
   templateUrl: './tipopersona.component.html',
   styleUrls: ['./tipopersona.component.scss']
})
export class TipoPersonaComponent implements OnInit {
   tipos_personas: TipoPersona[] = [];
   tipo_personaSelected: TipoPersona = new TipoPersona();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
      private toastr: ToastrManager,
      private tipo_personaDataService: TipoPersonaService) { }

   ngOnInit() {
      this.goToPage(1);
   }

   selectTipoPersona(tipo_persona: TipoPersona) {
      this.tipo_personaSelected = tipo_persona;
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getTiposPersonas();
   }

   getTiposPersonas() {
      this.tipos_personas = [];
      this.tipo_personaSelected = new TipoPersona();
      this.tipo_personaDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.tipos_personas = r.data as TipoPersona[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newTipoPersona(content) {
      this.tipo_personaSelected = new TipoPersona();
      this.showDialog = true;
   }

   editTipoPersona(content) {
      if (typeof this.tipo_personaSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteTipoPersona() {
      if (typeof this.tipo_personaSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.tipo_personaDataService.delete(this.tipo_personaSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getTiposPersonas();
      }).catch(e => console.log(e));
   }

   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.tipo_personaSelected.id === 'undefined') {
         this.tipo_personaDataService.post(this.tipo_personaSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getTiposPersonas();
         }).catch(e => console.log(e));
      } else {
         this.tipo_personaDataService.put(this.tipo_personaSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getTiposPersonas();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}