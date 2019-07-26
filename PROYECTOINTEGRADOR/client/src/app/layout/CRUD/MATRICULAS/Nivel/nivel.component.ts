import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NivelService } from './../../../../services/CRUD/MATRICULAS/nivel.service';
import { Nivel } from './../../../../models/MATRICULAS/Nivel';

@Component({
   selector: 'app-nivel',
   templateUrl: './nivel.component.html',
   styleUrls: ['./nivel.component.scss']
})
export class NivelComponent implements OnInit {
   niveles: Nivel[] = [];
   nivelSelected: Nivel = new Nivel();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
      private toastr: ToastrManager,
      private nivelDataService: NivelService) { }

   ngOnInit() {
      this.goToPage(1);
   }

   selectNivel(nivel: Nivel) {
      this.nivelSelected = nivel;
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getNiveles();
   }

   getNiveles() {
      this.niveles = [];
      this.nivelSelected = new Nivel();
      this.nivelDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.niveles = r.data as Nivel[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newNivel(content) {
      this.nivelSelected = new Nivel();
      this.showDialog = true;
   }

   editNivel(content) {
      if (typeof this.nivelSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteNivel() {
      if (typeof this.nivelSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.nivelDataService.delete(this.nivelSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getNiveles();
      }).catch(e => console.log(e));
   }


   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.nivelSelected.id === 'undefined') {
         this.nivelDataService.post(this.nivelSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getNiveles();
         }).catch(e => console.log(e));
      } else {
         this.nivelDataService.put(this.nivelSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getNiveles();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}