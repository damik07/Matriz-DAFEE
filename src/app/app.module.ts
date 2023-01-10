import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { MenuNacComponent } from './Componentes/sidebar/menu-nac.component';
import { CompIntegComponent } from './Componentes/Nacionales/vistas/comp-integ/comp-integ.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { SerieIntegComponent } from './Componentes/Nacionales/vistas/serie-integ/serie-integ.component';
import { IntMensRealComponent } from './Componentes/Nacionales/vistas/int-mens-real/int-mens-real.component';
import { CompDistComponent } from './Componentes/Nacionales/vistas/distribucion/comp-dist/comp-dist.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule, AppRoutingModule ],
  declarations: [ AppComponent, HelloComponent, NavbarComponent, FooterComponent, MenuNacComponent, CompIntegComponent, SerieIntegComponent, IntMensRealComponent, CompDistComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
