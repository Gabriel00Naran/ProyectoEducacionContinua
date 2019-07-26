import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CursoService } from './../../../../services/CRUD/MATRICULAS/curso.service';
import { Curso } from './../../../../models/MATRICULAS/Curso';
import { ModalidadService } from './../../../../services/CRUD/MATRICULAS/modalidad.service';
import { Modalidad } from './../../../../models/MATRICULAS/Modalidad';
import { NivelService } from './../../../../services/CRUD/MATRICULAS/nivel.service';
import { Nivel } from './../../../../models/MATRICULAS/Nivel';
import { HorarioService } from './../../../../services/CRUD/MATRICULAS/horario.service';
import { Horario } from './../../../../models/MATRICULAS/Horario';

@Component({
   selector: 'app-curso',
   templateUrl: './curso.component.html',
   styleUrls: ['./curso.component.scss']
})
export class CursoComponent implements OnInit {
   cursos: Curso[] = [];
   cursoSelected: Curso = new Curso();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   modalidades: Modalidad[] = [];
   niveles: Nivel[] = [];
   horarios: Horario[] = [];
   constructor(
      private toastr: ToastrManager,
      private modalidadDataService: ModalidadService,
      private nivelDataService: NivelService,
      private horarioDataService: HorarioService,
      private cursoDataService: CursoService) { }

   ngOnInit() {
      this.goToPage(1);
      this.getModalidad();
      this.getNivel();
      this.getHorario();
   }

   selectCurso(curso: Curso) {
      this.cursoSelected = curso;
   }

   getModalidad() {
      this.modalidades = [];
      this.modalidadDataService.get().then(r => {
         this.modalidades = r as Modalidad[];
      }).catch(e => console.log(e));
   }

   getNivel() {
      this.niveles = [];
      this.nivelDataService.get().then(r => {
         this.niveles = r as Nivel[];
      }).catch(e => console.log(e));
   }

   getHorario() {
      this.horarios = [];
      this.horarioDataService.get().then(r => {
         this.horarios = r as Horario[];
      }).catch(e => console.log(e));
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getCursos();
   }

   getCursos() {
      this.cursos = [];
      this.cursoSelected = new Curso();
      this.cursoSelected.modalidad_id = 0;
      this.cursoSelected.nivel_id = 0;
      this.cursoSelected.horario_id = 0;
      this.cursoDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.cursos = r.data as Curso[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newCurso(content) {
      this.cursoSelected = new Curso();
      this.cursoSelected.modalidad_id = 0;
      this.cursoSelected.nivel_id = 0;
      this.cursoSelected.horario_id = 0;
      this.showDialog = true;
   }

   editCurso(content) {
      if (typeof this.cursoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteCurso() {
      if (typeof this.cursoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.cursoDataService.delete(this.cursoSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getCursos();
      }).catch(e => console.log(e));
   }

   //dialogos de carga completa de lo que se ingrese
   saveDialogResult() {
      if (typeof this.cursoSelected.id === 'undefined') {
         this.cursoDataService.post(this.cursoSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getCursos();
         }).catch(e => console.log(e));
      } else {
         this.cursoDataService.put(this.cursoSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getCursos();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}