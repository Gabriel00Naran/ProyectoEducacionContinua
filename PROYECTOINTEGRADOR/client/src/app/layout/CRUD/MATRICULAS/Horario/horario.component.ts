import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HorarioService } from './../../../../services/CRUD/MATRICULAS/horario.service';
import { Horario } from './../../../../models/MATRICULAS/Horario';
import { TipoPersonaService } from './../../../../services/CRUD/MATRICULAS/tipopersona.service';
import { TipoPersona } from './../../../../models/MATRICULAS/TipoPersona';

@Component({
   selector: 'app-horario',
   templateUrl: './horario.component.html',
   styleUrls: ['./horario.component.scss']
})
export class HorarioComponent implements OnInit {
   horarios: Horario[] = [];
   horarioSelected: Horario = new Horario();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   tipos_personas: TipoPersona[] = [];
   constructor(
      private toastr: ToastrManager,
      private tipo_personaDataService: TipoPersonaService,
      private horarioDataService: HorarioService) { }

   ngOnInit() {
      this.goToPage(1);
      this.getTipoPersona();
   }

   selectHorario(horario: Horario) {
      this.horarioSelected = horario;
   }

   getTipoPersona() {
      this.tipos_personas = [];
      this.tipo_personaDataService.get().then(r => {
         this.tipos_personas = r as TipoPersona[];
      }).catch(e => console.log(e));
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getHorarios();
   }

   getHorarios() {
      this.horarios = [];
      this.horarioSelected = new Horario();
      this.horarioSelected.tipo_persona_id = 0;
      this.horarioDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.horarios = r.data as Horario[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newHorario(content) {
      this.horarioSelected = new Horario();
      this.horarioSelected.tipo_persona_id = 0;
      this.showDialog = true;
   }

   editHorario(content) {
      if (typeof this.horarioSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteHorario() {
      if (typeof this.horarioSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.horarioDataService.delete(this.horarioSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getHorarios();
      }).catch(e => console.log(e));
   }

   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.horarioSelected.id === 'undefined') {
         this.horarioDataService.post(this.horarioSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getHorarios();
         }).catch(e => console.log(e));
      } else {
         this.horarioDataService.put(this.horarioSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getHorarios();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}