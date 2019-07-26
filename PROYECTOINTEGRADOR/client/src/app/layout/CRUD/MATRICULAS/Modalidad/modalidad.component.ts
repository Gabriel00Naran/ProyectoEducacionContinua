import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ModalidadService } from './../../../../services/CRUD/MATRICULAS/modalidad.service';
import { Modalidad } from './../../../../models/MATRICULAS/Modalidad';

@Component({
   selector: 'app-modalidad',
   templateUrl: './modalidad.component.html',
   styleUrls: ['./modalidad.component.scss']
})
export class ModalidadComponent implements OnInit {
   modalidades: Modalidad[] = [];
   modalidadSelected: Modalidad = new Modalidad();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
      private toastr: ToastrManager,
      private modalidadDataService: ModalidadService) { }

   ngOnInit() {
      this.goToPage(1);
   }

   selectModalidad(modalidad: Modalidad) {
      this.modalidadSelected = modalidad;
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getModalidades();
   }

   getModalidades() {
      this.modalidades = [];
      this.modalidadSelected = new Modalidad();
      this.modalidadDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.modalidades = r.data as Modalidad[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newModalidad(content) {
      this.modalidadSelected = new Modalidad();
      this.showDialog = true;
   }

   editModalidad(content) {
      if (typeof this.modalidadSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteModalidad() {
      if (typeof this.modalidadSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.modalidadDataService.delete(this.modalidadSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getModalidades();
      }).catch(e => console.log(e));
   }



   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.modalidadSelected.id === 'undefined') {
         this.modalidadDataService.post(this.modalidadSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getModalidades();
         }).catch(e => console.log(e));
      } else {
         this.modalidadDataService.put(this.modalidadSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getModalidades();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}