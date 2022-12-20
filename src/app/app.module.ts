import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NavbarComponent } from './Componentes/navbar/navbar.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { MenuNacComponent } from './Componentes/Nacionales/menu-nac/menu-nac.component';
import { CompIntegComponent } from './Componentes/Nacionales/vistas/comp-integ/comp-integ.component';
import { FiltroRangoFechaPipe } from './Componentes/Nacionales/vistas/comp-integ/filtro-rango-fecha.pipe';
import { SumByConceptoPipe } from './Componentes/Nacionales/vistas/comp-integ/sum-by-concepto.pipe';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgbModule ],
  declarations: [ AppComponent, HelloComponent, NavbarComponent, FooterComponent, MenuNacComponent, CompIntegComponent, FiltroRangoFechaPipe, SumByConceptoPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
