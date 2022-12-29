import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompIntegComponent } from '../Componentes/Nacionales/vistas/comp-integ/comp-integ.component';

const routes: Routes = [
  {path:'compIntegracion', component:CompIntegComponent, //canActivate:[GuardGuard]
    },
  {path:'iniciar-sesion', component:CompIntegComponent},
  {path:'', redirectTo:'compIntegracion', pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }