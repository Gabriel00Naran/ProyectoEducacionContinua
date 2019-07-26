import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EstadoCivilService } from './../../../../services/CRUD/MATRICULAS/estadocivil.service';
import { EstadoCivil } from './../../../../models/MATRICULAS/EstadoCivil';

@Component({
   selector: 'app-estadocivil',
   templateUrl: './estadocivil.component.html',
   styleUrls: ['./estadocivil.component.scss']
})
export class EstadoCivilComponent implements OnInit {
   estados_civiles: EstadoCivil[] = [];
   estado_civilSelected: EstadoCivil = new EstadoCivil();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
      private toastr: ToastrManager,
      private estado_civilDataService: EstadoCivilService) { }

   ngOnInit() {
      this.goToPage(1);
   }

   selectEstadoCivil(estado_civil: EstadoCivil) {
      this.estado_civilSelected = estado_civil;
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getEstadosCiviles();
   }

   getEstadosCiviles() {
      this.estados_civiles = [];
      this.estado_civilSelected = new EstadoCivil();
      this.estado_civilDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.estados_civiles = r.data as EstadoCivil[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newEstadoCivil(content) {
      this.estado_civilSelected = new EstadoCivil();
      this.showDialog = true;
   }

   editEstadoCivil(content) {
      if (typeof this.estado_civilSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteEstadoCivil() {
      if (typeof this.estado_civilSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.estado_civilDataService.delete(this.estado_civilSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getEstadosCiviles();
      }).catch(e => console.log(e));
   }





   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.estado_civilSelected.id === 'undefined') {
         this.estado_civilDataService.post(this.estado_civilSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getEstadosCiviles();
         }).catch(e => console.log(e));
      } else {
         this.estado_civilDataService.put(this.estado_civilSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getEstadosCiviles();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}