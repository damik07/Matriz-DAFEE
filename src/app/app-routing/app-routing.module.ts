import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompIntegComponent } from '../Componentes/Nacionales/vistas/integracion/comp-integ/comp-integ.component';
import { CompDistComponent } from '../Componentes/Nacionales/vistas/distribucion/comp-dist/comp-dist.component';
import { DistMensRealComponent } from '../Componentes/Nacionales/vistas/distribucion/dist-mens-real/dist-mens-real.component';
import { SerieDistComponent } from '../Componentes/Nacionales/vistas/distribucion/serie-dist/serie-dist.component';
import { IntMensRealComponent } from '../Componentes/Nacionales/vistas/integracion/int-mens-real/int-mens-real.component';
import { SerieIntegComponent } from '../Componentes/Nacionales/vistas/integracion/serie-integ/serie-integ.component';
import { BDImportComponent } from '../Componentes/Nacionales/vistas/integracion/bdimport/bdimport.component';
import { PlCompMensComponent } from '../Componentes/plantaPersonal/vistas/pl-comp-mens/pl-comp-mens.component';
import { PlCompErbesComponent } from '../Componentes/plantaPersonal/vistas/pl-comp-erbes/pl-comp-erbes.component';
import { PlCompDaComponent } from '../Componentes/plantaPersonal/vistas/pl-comp-da/pl-comp-da.component';
import { PlPlanilla6Component } from '../Componentes/plantaPersonal/vistas/pl-planilla6/pl-planilla6.component';

const routes: Routes = [
  {path:'compIntegracion', component:CompIntegComponent, //canActivate:[GuardGuard]
    },
  {path:'serieInteg', component:SerieIntegComponent},
  {path:'realInteg', component:IntMensRealComponent},
  {path:'compDist', component:CompDistComponent},
  {path:'realDist', component:DistMensRealComponent},
  {path:'serieDist', component:SerieDistComponent},
  {path:'BDImpInt', component:BDImportComponent},
  {path:'plCompMens', component:PlCompMensComponent},
  {path:'plCompErbes', component:PlCompErbesComponent},
  {path:'plCompDA', component:PlCompDaComponent},
  {path:'plPlanilla6', component:PlPlanilla6Component},
  //{path:'', redirectTo:'compIntegracion', pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }