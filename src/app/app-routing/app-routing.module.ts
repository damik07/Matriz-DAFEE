import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompIntegComponent } from '../Componentes/Nacionales/vistas/comp-integ/comp-integ.component';
import { CompDistComponent } from '../Componentes/Nacionales/vistas/distribucion/comp-dist/comp-dist.component';
import { IntMensRealComponent } from '../Componentes/Nacionales/vistas/int-mens-real/int-mens-real.component';
import { SerieIntegComponent } from '../Componentes/Nacionales/vistas/serie-integ/serie-integ.component';

const routes: Routes = [
  {path:'compIntegracion', component:CompIntegComponent, //canActivate:[GuardGuard]
    },
  {path:'serieInteg', component:SerieIntegComponent},
  {path:'realInteg', component:IntMensRealComponent},
  {path:'compDist', component:CompDistComponent},
  //{path:'', redirectTo:'compIntegracion', pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }