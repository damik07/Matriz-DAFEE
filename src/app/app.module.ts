import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { MenuNacComponent } from './Componentes/sidebar/menu-nac.component';
import { CompIntegComponent } from './Componentes/Nacionales/vistas/integracion/comp-integ/comp-integ.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SerieIntegComponent } from './Componentes/Nacionales/vistas/integracion/serie-integ/serie-integ.component';
import { IntMensRealComponent } from './Componentes/Nacionales/vistas/integracion/int-mens-real/int-mens-real.component';
import { CompDistComponent } from './Componentes/Nacionales/vistas/distribucion/comp-dist/comp-dist.component';
import { DistMensRealComponent } from './Componentes/Nacionales/vistas/distribucion/dist-mens-real/dist-mens-real.component';
import { SerieDistComponent } from './Componentes/Nacionales/vistas/distribucion/serie-dist/serie-dist.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BDImportComponent } from './Componentes/Nacionales/vistas/integracion/bdimport/bdimport.component';
import { PlCompMensComponent } from './Componentes/plantaPersonal/vistas/pl-comp-mens/pl-comp-mens.component';
import { PlCompErbesComponent } from './Componentes/plantaPersonal/vistas/pl-comp-erbes/pl-comp-erbes.component';
import { PlCompDaComponent } from './Componentes/plantaPersonal/vistas/pl-comp-da/pl-comp-da.component';
import { PlPlanilla6Component } from './Componentes/plantaPersonal/vistas/pl-planilla6/pl-planilla6.component';
import { PlPlanilla1RFComponent } from './Componentes/plantaPersonal/vistas/pl-planilla1-rf/pl-planilla1-rf.component';
import { PlPlanilla2RfComponent } from './Componentes/plantaPersonal/vistas/pl-planilla2-rf/pl-planilla2-rf.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, AppRoutingModule, NgxFileDropModule ],
  declarations: [ AppComponent, HelloComponent, NavbarComponent, FooterComponent, MenuNacComponent, CompIntegComponent, SerieIntegComponent, IntMensRealComponent, BDImportComponent, CompDistComponent, DistMensRealComponent, SerieDistComponent, PlCompMensComponent, PlCompErbesComponent, PlCompDaComponent, PlPlanilla6Component, PlPlanilla1RFComponent, PlPlanilla2RfComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
