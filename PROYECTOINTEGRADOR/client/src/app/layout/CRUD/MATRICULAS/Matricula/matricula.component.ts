import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MatriculaService } from './../../../../services/CRUD/MATRICULAS/matricula.service';
import { Matricula } from './../../../../models/MATRICULAS/Matricula';
import { CursoService } from './../../../../services/CRUD/MATRICULAS/curso.service';
import { Curso } from './../../../../models/MATRICULAS/Curso';
import { PersonaService } from './../../../../services/CRUD/MATRICULAS/persona.service';
import { Persona } from './../../../../models/MATRICULAS/Persona';
import { EstadoService } from './../../../../services/CRUD/MATRICULAS/estado.service';
import { Estado } from './../../../../models/MATRICULAS/Estado';

@Component({
   selector: 'app-matricula',
   templateUrl: './matricula.component.html',
   styleUrls: ['./matricula.component.scss']
})
export class MatriculaComponent implements OnInit {
   matriculas: Matricula[] = [];
   matriculaSelected: Matricula = new Matricula();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   cursos: Curso[] = [];
   personas: Persona[] = [];
   estados: Estado[] = [];
   constructor(
      private toastr: ToastrManager,
      private cursoDataService: CursoService,
      private personaDataService: PersonaService,
      private estadoDataService: EstadoService,
      private matriculaDataService: MatriculaService) { }

   ngOnInit() {
      this.goToPage(1);
      this.getCurso();
      this.getPersona();
      this.getEstado();
   }

   selectMatricula(matricula: Matricula) {
      this.matriculaSelected = matricula;
   }

   getCurso() {
      this.cursos = [];
      this.cursoDataService.get().then(r => {
         this.cursos = r as Curso[];
      }).catch(e => console.log(e));
   }

   getPersona() {
      this.personas = [];
      this.personaDataService.get().then(r => {
         this.personas = r as Persona[];
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
      this.getMatriculas();
   }

   getMatriculas() {
      this.matriculas = [];
      this.matriculaSelected = new Matricula();
      this.matriculaSelected.curso_id = 0;
      this.matriculaSelected.persona_id = 0;
      this.matriculaSelected.estado_id = 0;
      this.matriculaDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.matriculas = r.data as Matricula[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newMatricula(content) {
      this.matriculaSelected = new Matricula();
      this.matriculaSelected.curso_id = 0;
      this.matriculaSelected.persona_id = 0;
      this.matriculaSelected.estado_id = 0;
      this.showDialog = true;
   }

   editMatricula(content) {
      if (typeof this.matriculaSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteMatricula() {
      if (typeof this.matriculaSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.matriculaDataService.delete(this.matriculaSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getMatriculas();
      }).catch(e => console.log(e));
   }

   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.matriculaSelected.id === 'undefined') {
         this.matriculaDataService.post(this.matriculaSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getMatriculas();
         }).catch(e => console.log(e));
      } else {
         this.matriculaDataService.put(this.matriculaSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getMatriculas();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}