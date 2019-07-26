import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneroComponent } from './genero.component';

const routes: Routes = [
   {
      path: '',
      component: GeneroComponent
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class GeneroRoutingModule {}
