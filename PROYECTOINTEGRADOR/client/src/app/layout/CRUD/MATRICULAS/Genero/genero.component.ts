import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { GeneroService } from './../../../../services/CRUD/MATRICULAS/genero.service';
import { Genero } from './../../../../models/MATRICULAS/Genero';

@Component({
   selector: 'app-genero',
   templateUrl: './genero.component.html',
   styleUrls: ['./genero.component.scss']
})
export class GeneroComponent implements OnInit {
   generos: Genero[] = [];
   generoSelected: Genero = new Genero();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
      private toastr: ToastrManager,
      private generoDataService: GeneroService) { }

   ngOnInit() {
      this.goToPage(1);
   }

   selectGenero(genero: Genero) {
      this.generoSelected = genero;
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getGeneros();
   }

   getGeneros() {
      this.generos = [];
      this.generoSelected = new Genero();
      this.generoDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.generos = r.data as Genero[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newGenero(content) {
      this.generoSelected = new Genero();
      this.showDialog = true;
   }

   editGenero(content) {
      if (typeof this.generoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteGenero() {
      if (typeof this.generoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.generoDataService.delete(this.generoSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getGeneros();
      }).catch(e => console.log(e));
   }


   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.generoSelected.id === 'undefined') {
         this.generoDataService.post(this.generoSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getGeneros();
         }).catch(e => console.log(e));
      } else {
         this.generoDataService.put(this.generoSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getGeneros();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}