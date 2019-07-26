import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoLaboralComponent } from './infolaboral.component';

const routes: Routes = [
   {
      path: '',
      component: InfoLaboralComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class InfoLaboralRoutingModule {}
