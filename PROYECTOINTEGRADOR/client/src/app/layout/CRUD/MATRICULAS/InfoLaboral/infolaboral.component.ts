import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { InfoLaboralService } from './../../../../services/CRUD/MATRICULAS/infolaboral.service';
import { InfoLaboral } from './../../../../models/MATRICULAS/InfoLaboral';

@Component({
   selector: 'app-infolaboral',
   templateUrl: './infolaboral.component.html',
   styleUrls: ['./infolaboral.component.scss']
})
export class InfoLaboralComponent implements OnInit {
   infos_laborales: InfoLaboral[] = [];
   info_laboralSelected: InfoLaboral = new InfoLaboral();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   constructor(
      private toastr: ToastrManager,
      private info_laboralDataService: InfoLaboralService) { }

   ngOnInit() {
      this.goToPage(1);
    
   }

   selectInfoLaboral(info_laboral: InfoLaboral) {
      this.info_laboralSelected = info_laboral;
   }


   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getInfosLaborales();
   }

   getInfosLaborales() {
      this.infos_laborales = [];
      this.info_laboralSelected = new InfoLaboral();
      this.info_laboralSelected.persona_id = 0;
      this.info_laboralDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.infos_laborales = r.data as InfoLaboral[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newInfoLaboral(content) {
      this.info_laboralSelected = new InfoLaboral();
      this.info_laboralSelected.persona_id = 0;
      this.showDialog = true;
   }

   editInfoLaboral(content) {
      if (typeof this.info_laboralSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteInfoLaboral() {
      if (typeof this.info_laboralSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.info_laboralDataService.delete(this.info_laboralSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getInfosLaborales();
      }).catch(e => console.log(e));
   }


   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.info_laboralSelected.id === 'undefined') {
         this.info_laboralDataService.post(this.info_laboralSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getInfosLaborales();
         }).catch(e => console.log(e));
      } else {
         this.info_laboralDataService.put(this.info_laboralSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getInfosLaborales();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}