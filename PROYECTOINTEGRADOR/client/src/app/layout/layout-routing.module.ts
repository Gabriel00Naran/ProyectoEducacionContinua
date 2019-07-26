import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
   {
      path: '',
      component: LayoutComponent,
      children: [
         {
            path: '',
            redirectTo: 'persona'
         },
       
         {
            path: 'profile',
            loadChildren: './profile/profile.module#ProfileModule'
         },

         //Matriculas

         {
            path: 'contacto',
            loadChildren: './CRUD/MATRICULAS/Contacto/contacto.module#ContactoModule'
         },
         {
            path: 'curso',
            loadChildren: './CRUD/MATRICULAS/Curso/curso.module#CursoModule'
         },
         {
            path: 'estado',
            loadChildren: './CRUD/MATRICULAS/Estado/estado.module#EstadoModule'
         },
         {
            path: 'estado_civil',
            loadChildren: './CRUD/MATRICULAS/EstadoCivil/estadocivil.module#EstadoCivilModule'
         },
         {
            path: 'genero',
            loadChildren: './CRUD/MATRICULAS/Genero/genero.module#GeneroModule'
         },
         {
            path: 'horario',
            loadChildren: './CRUD/MATRICULAS/Horario/horario.module#HorarioModule'
         },
         {
            path: 'info_laboral',
            loadChildren: './CRUD/MATRICULAS/InfoLaboral/infolaboral.module#InfoLaboralModule'
         },
         {
            path: 'matricula',
            loadChildren: './CRUD/MATRICULAS/Matricula/matricula.module#MatriculaModule'
         },
         {
            path: 'modalidad',
            loadChildren: './CRUD/MATRICULAS/Modalidad/modalidad.module#ModalidadModule'
         },
         {
            path: 'nivel',
            loadChildren: './CRUD/MATRICULAS/Nivel/nivel.module#NivelModule'
         },
         {
            path: 'persona',
            loadChildren: './CRUD/MATRICULAS/Persona/persona.module#PersonaModule'
         },
         {
            path: 'tipo_persona',
            loadChildren: './CRUD/MATRICULAS/TipoPersona/tipopersona.module#TipoPersonaModule'
         },
       
      
       
      ]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LayoutRoutingModule {}