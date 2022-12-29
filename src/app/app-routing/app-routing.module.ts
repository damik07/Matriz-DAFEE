import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompIntegComponent } from '../Componentes/Nacionales/vistas/comp-integ/comp-integ.component';
import { SerieComponent } from '../Componentes/Nacionales/vistas/serie/serie.component';

const routes: Routes = [
  {path:'compIntegracion', component:CompIntegComponent, //canActivate:[GuardGuard]
    },
  {path:'serieInteg', component:SerieComponent},
  {path:'', redirectTo:'compIntegracion', pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }