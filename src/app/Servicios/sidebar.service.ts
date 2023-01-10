import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'}
)
export class SidebarService {

  menu?:any[]=[{
    
    integracion:[{
    titulo: "Integración Recursos Nacionales",
    icono: "nav-icon",
    submenu:[
     {titulo: "Comparativo Integración", url: "compIntegracion", icono: "fa fa-users"},
     {titulo: "Serie Integración", url: "serieInteg", icono: "fa fa-users"},
     {titulo: "Recaudación Real", url: "realInteg", icono: "fa fa-users"}
    ]

    }],

  distribucion:[{
    titulo: "Distribución Recursos Nacionales",
    icono: "nav-icon",
    submenu:[
     {titulo: "Comparativo Distribución", url: "compIntegracion", icono: "fa fa-users"},
     {titulo: "Serie Distribución", url: "serieInteg", icono: "fa fa-users"},
     {titulo: "Distribución Real", url: "realInteg", icono: "fa fa-users"}
    ]

  }]

}]

}