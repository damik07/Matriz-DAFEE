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
     {titulo: "Recaudación Real", url: "realInteg", icono: "fa fa-users"},
     {titulo: "Importador de Base de Datos", url: "BDImpInt", icono: "fa fa-users"}
    ]

    }],

  distribucion:[{
    titulo: "Distribución Recursos Nacionales",
    icono: "nav-icon",
    submenu:[
     {titulo: "Comparativo Distribución", url: "compDist", icono: "fa fa-users"},
     {titulo: "Serie Distribución", url: "serieDist", icono: "fa fa-users"},
     {titulo: "Distribución Real", url: "realDist", icono: "fa fa-users"}
    ]

  }],

  plantaPl:[{
    titulo: "Planillas Mensuales",
    icono: "nav-icon",
    submenu:[
     {titulo: "Planilla 6", url: "plPlanilla6", icono: "fa fa-users"},
     {titulo: "Planilla 1 RF", url: "plPlanilla1", icono: "fa fa-users"},
     {titulo: "Planilla 2 RF", url: "plPlanilla2", icono: "fa fa-users"}
    ]

  }],

  plantaComp:[{
    titulo: "Comparativos Planta Personal",
    icono: "nav-icon",
    submenu:[
     {titulo: "Comparativo Mensual", url: "plCompMens", icono: "fa fa-users"},
     {titulo: "Comparativo Erbes", url: "plCompErbes", icono: "fa fa-users"},
     {titulo: "Comparativo DA", url: "plCompDA", icono: "fa fa-users"}
    ]

  }],

  plantaSerie:[{
    titulo: "Distribución Recursos Nacionales",
    icono: "nav-icon",
    submenu:[
     {titulo: "Serie por Escalafón", url: "plSerieEsc", icono: "fa fa-users"},
     {titulo: "Serie por DA", url: "plSerieDA", icono: "fa fa-users"}
    ]

  }]

}]

}