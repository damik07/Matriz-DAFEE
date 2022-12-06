import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'}
)
export class SidebarService {

  menu?:any[]=[{
    titulo: "Integración Recursos Nacionales",
    icono: "nav-icon",
    submenu:[
     {titulo: "Comparativo", url: "compInteg", icono: "fa fa-users"},
     {titulo: "Serie", url: "serieInteg", icono: "fa fa-users"},
     {titulo: "Recaudación Real", url: "realInteg", icono: "fa fa-users"}
    ]

  }]

}