import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EstadoService } from './../../../../services/CRUD/MATRICULAS/estado.service';
import { Estado } from './../../../../models/MATRICULAS/Estado';

@Component({
   selector: 'app-estado',
   templateUrl: './estado.component.html',
   styleUrls: ['./estado.component.scss']
})
export class EstadoComponent implements OnInit {
   estados: Estado[] = [];
   estadoSelected: Estado = new Estado();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
      private toastr: ToastrManager,
      private estadoDataService: EstadoService) { }

   ngOnInit() {
      this.goToPage(1);
   }

   selectEstado(estado: Estado) {
      this.estadoSelected = estado;
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getEstados();
   }

   getEstados() {
      this.estados = [];
      this.estadoSelected = new Estado();
      this.estadoDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.estados = r.data as Estado[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newEstado(content) {
      this.estadoSelected = new Estado();
      this.showDialog = true;
   }

   editEstado(content) {
      if (typeof this.estadoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteEstado() {
      if (typeof this.estadoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.estadoDataService.delete(this.estadoSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getEstados();
      }).catch(e => console.log(e));
   }




   saveDialogResult() {
      if (typeof this.estadoSelected.id === 'undefined') {
         this.estadoDataService.post(this.estadoSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getEstados();
         }).catch(e => console.log(e));
      } else {
         this.estadoDataService.put(this.estadoSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getEstados();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}