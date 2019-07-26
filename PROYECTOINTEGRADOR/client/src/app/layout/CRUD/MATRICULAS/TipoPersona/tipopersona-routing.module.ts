import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoPersonaComponent } from './tipopersona.component';

const routes: Routes = [
   {
      path: '',
      component: TipoPersonaComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class TipoPersonaRoutingModule {}
