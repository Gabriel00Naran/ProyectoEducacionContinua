import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ContactoService } from './../../../../services/CRUD/MATRICULAS/contacto.service';
import { Contacto } from './../../../../models/MATRICULAS/Contacto';
import { PersonaService } from './../../../../services/CRUD/MATRICULAS/persona.service';
import { Persona } from './../../../../models/MATRICULAS/Persona';


@Component({
   selector: 'app-contacto',
   templateUrl: './contacto.component.html',
   styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
   contactos: Contacto[] = [];
   contactoSelected: Contacto = new Contacto();

   currentPage = 1;
   lastPage = 1;
   showDialog = false;
   recordsByPage = 5;
   personas: Persona[] = [];
   constructor(
      private toastr: ToastrManager,
      private personaDataService: PersonaService,
      private contactoDataService: ContactoService) { }

   ngOnInit() {
      this.goToPage(1);
      this.getPersona();
   }

   selectContacto(contacto: Contacto) {
      this.contactoSelected = contacto;
   }

   getPersona() {
      this.personas = [];
      this.personaDataService.get().then(r => {
         this.personas = r as Persona[];
      }).catch(e => console.log(e));
   }

   goToPage(page: number) {
      if (page < 1 || page > this.lastPage) {
         this.toastr.errorToastr('La página solicitada no existe.', 'Error');
         return;
      }
      this.currentPage = page;
      this.getContactos();
   }

   getContactos() {
      this.contactos = [];
      this.contactoSelected = new Contacto();
      this.contactoDataService.get_paginate(this.recordsByPage, this.currentPage).then(r => {
         this.contactos = r.data as Contacto[];
         this.lastPage = r.last_page;
      }).catch(e => console.log(e));
   }

   newContacto(content) {
      this.contactoSelected = new Contacto();
      this.showDialog = true;
   }

   editContacto(content) {
      if (typeof this.contactoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.showDialog = true;
   }

   deleteContacto() {
      if (typeof this.contactoSelected.id === 'undefined') {
         this.toastr.errorToastr('Debe seleccionar un registro.', 'Error');
         return;
      }
      this.contactoDataService.delete(this.contactoSelected.id).then(r => {
         this.toastr.successToastr('Registro Borrado satisfactoriamente.', 'Borrar');
         this.getContactos();
      }).catch(e => console.log(e));
   }

   //dialogos de carga completa 
   saveDialogResult() {
      if (typeof this.contactoSelected.id === 'undefined') {
         this.contactoDataService.post(this.contactoSelected).then(r => {
            this.toastr.successToastr('Datos guardados satisfactoriamente.', 'Nuevo');
            this.getContactos();
         }).catch(e => console.log(e));
      } else {
         this.contactoDataService.put(this.contactoSelected).then(r => {
            this.toastr.successToastr('Registro actualizado satisfactoriamente.', 'Actualizar');
            this.getContactos();
         }).catch(e => console.log(e));
      }
   }

   cancelDialogResult() {
      this.showDialog = false; this.goToPage(this.currentPage);
   }
}