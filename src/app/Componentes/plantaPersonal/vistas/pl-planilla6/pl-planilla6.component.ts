import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlantaDePersonalService } from '../../../../Servicios/planta-de-personal.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-pl-planilla6',
  templateUrl: './pl-planilla6.component.html',
  styleUrls: ['./pl-planilla6.component.css']
})
export class PlPlanilla6Component implements OnInit {
  dataPlanta?: any[];
  permanente?: any[];
  total1Per: any[];
  admiPubNoFinPer: any[];
  totalAdmiPubPer: any[];
  instEmpYOtrosPer: any[];
  totalInstEmpPer: any[];
  temporario?: any[];
  total1Tem: any[];
  admiPubNoFinTem: any[];
  totalAdmiPubTem: any[];
  instEmpYOtrosTem: any[];
  totalInstEmpTem: any[];
  suplente?: any[];
  total1Sup: any[];
  admiPubNoFinSup: any[];
  totalAdmiPubSup: any[];
  instEmpYOtrosSup: any[];
  totalInstEmpSup: any[];
  contratos?: any[];
  total1Con: any[];
  admiPubNoFinCon: any[];
  totalAdmiPubCon: any[];
  instEmpYOtrosCon: any[];
  totalInstEmpCon: any[];
  becarios?: any[];
  total1Bec: any[];
  residentes?: any[];
  total1Res: any[];


  headers = ['Planta Permanente', 'Planta Temporaria', 'Planta Suplente'];


  constructor(private router: Router, private plService: PlantaDePersonalService) {
    this.dataPlanta = this.plService.planta;
   }

  ngOnInit() {
  }

  filterData1(formData) {
    // Filtrar los datos del servicio según el rango de fechas especificado en el formulario
    const datosFiltrados1 = this.dataPlanta.filter(
      (dato) =>
        new Date(dato.fecha).getMonth() ===
        new Date(formData.startDate1).getMonth()
    );
    const dfiltro1 = datosFiltrados1.filter(
      (dato) =>
        new Date(dato.fecha).getFullYear() ===
        new Date(formData.startDate1).getFullYear()
    );

    //filtro por escalafón
    const escGeneral = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'General'        
    );
    const escPolicia = dfiltro1.filter(
      (dato) =>
        dato.DA === '956' && dato.escalafon === 'Seguridad'        
    );
    const escSerPen = dfiltro1.filter(
      (dato) =>
        dato.DA === '976' && dato.escalafon === 'Seguridad'        
    );
    const escMed = dfiltro1.filter(
      (dato) =>
        dato.aux_salud === 'Médicos' && dato.escalafon === 'Salud'        
    );
    const escEnf = dfiltro1.filter(
      (dato) =>
        dato.aux_salud === 'Enfermeros' && dato.escalafon === 'Salud'        
    );
    const escJusticia = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'Justicia'        
    );
    const escVial = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'Vial'        
    );
    const escSuperior = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'Autoridades Superiores'        
    );
    const escLegislativo = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'Legislativo'        
    );
    const escResto = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'Resto'        
    );
    const escDocCar = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'Docente' && dato.aux_cargo === 'Cargo'        
    );
    const escDocHor = dfiltro1.filter(
      (dato) =>
        dato.escalafon === 'Docente' && dato.aux_cargo === 'Hs en cargo'        
    );


    //incorporación de cantidades en cada filtro de escalafón
    const filtroGeneral = escGeneral.map((obj) => ({
      ...obj,
      cantGeneral: obj.cantidad,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroPolicia = escPolicia.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: obj.cantidad,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroSerPen = escSerPen.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: obj.cantidad,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroMedicos = escMed.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: obj.cantidad,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroEnfermeria = escEnf.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: obj.cantidad,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroJusticia = escJusticia.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: obj.cantidad,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroVial = escVial.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: obj.cantidad,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroSuperior = escSuperior.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: obj.cantidad,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroLegislativo = escLegislativo.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: obj.cantidad,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroResto = escResto.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: obj.cantidad,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroDocCar = escDocCar.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: obj.cantidad,
      ...obj,
      cantDocHor: 0,
    }));

    const filtroDocHor = escDocHor.map((obj) => ({
      ...obj,
      cantGeneral: 0,
      ...obj,
      cantPolicia: 0,
      ...obj,
      cantSerPen: 0,
      ...obj,
      cantMedicos: 0,
      ...obj,
      cantEnfermeria: 0,
      ...obj,
      cantJusticia: 0,
      ...obj,
      cantVial: 0,
      ...obj,
      cantSuperior: 0,
      ...obj,
      cantLegislativo: 0,
      ...obj,
      cantResto: 0,
      ...obj,
      cantDocCar: 0,
      ...obj,
      cantDocHor: obj.cantidad,
    }));

    const datosFiltrados = filtroGeneral.concat(filtroPolicia, filtroSerPen, filtroMedicos, filtroEnfermeria, filtroJusticia, filtroVial, filtroSuperior, filtroLegislativo, filtroResto, filtroDocCar, filtroDocHor);

    // Filtro para personal permanente quitando el personal de las empresas que no consolidan
    const plantaPer = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Permanente' && e.tipo_organismo !== 'Empresas 2'
    );
    this.permanente = plantaPer.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    
    const total1General = this.permanente.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia = this.permanente.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen = this.permanente.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos = this.permanente.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria = this.permanente.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia = this.permanente.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial = this.permanente.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior = this.permanente.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo = this.permanente.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto = this.permanente.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar = this.permanente.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor = this.permanente.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.total1Per = [total1General, total1Policia, total1SerPen, total1Medicos, total1Enfermeria, total1Justicia, total1Vial, total1Superior, total1Legislativo, total1Resto, total1DocCar, total1DocHor];

    //permanente en admi y sector publico

    const filtroAdmiNoFinPer = this.permanente.filter((dato) => 
      dato.tipo_organismo !== "Empresas" && dato.tipo_organismo !== "Institutos de obra social"
    );
    

    this.admiPubNoFinPer = filtroAdmiNoFinPer.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor01 = this.admiPubNoFinPer.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalAdmiPubPer = [total1General01, total1Policia01, total1SerPen01, total1Medicos01, total1Enfermeria01, total1Justicia01, total1Vial01, total1Superior01, total1Legislativo01, total1Resto01, total1DocCar01, total1DocHor01];


    const filtroInsEmpPer = this.permanente.filter(dato => 
      dato.tipo_organismo === "Institutos de obra social" || dato.tipo_organismo === "Empresas"
    );

    this.instEmpYOtrosPer = filtroInsEmpPer.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor02 = this.instEmpYOtrosPer.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalInstEmpPer = [total1General02, total1Policia02, total1SerPen02, total1Medicos02, total1Enfermeria02, total1Justicia02, total1Vial02, total1Superior02, total1Legislativo02, total1Resto02, total1DocCar02, total1DocHor02];
        

    // Filtro para personal temporario quitando el personal de las empresas que no consolidan
    const plantaTem = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Temporario' && e.tipo_organismo !== 'Empresas 2'
    );
    this.temporario = plantaTem.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General1 = this.temporario.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia1 = this.temporario.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen1 = this.temporario.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos1 = this.temporario.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria1 = this.temporario.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia1 = this.temporario.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial1 = this.temporario.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior1 = this.temporario.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo1 = this.temporario.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto1 = this.temporario.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar1 = this.temporario.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor1 = this.temporario.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.total1Tem = [total1General1, total1Policia1, total1SerPen1, total1Medicos1, total1Enfermeria1, total1Justicia1, total1Vial1, total1Superior1, total1Legislativo1, total1Resto1, total1DocCar1, total1DocHor1];

    //temporario en admi y sector publico

    const filtroAdmiNoFinTem = this.temporario.filter(dato => 
      dato.tipo_organismo !== "Institutos de obra social" && dato.tipo_organismo !== "Empresas"
    );

    this.admiPubNoFinTem = filtroAdmiNoFinTem.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor11 = this.admiPubNoFinTem.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalAdmiPubTem = [total1General11, total1Policia11, total1SerPen11, total1Medicos11, total1Enfermeria11, total1Justicia11, total1Vial11, total1Superior11, total1Legislativo11, total1Resto11, total1DocCar11, total1DocHor11];


    const filtroInsEmpTem = this.temporario.filter(dato => 
      dato.tipo_organismo === "Institutos de obra social" || dato.tipo_organismo === "Empresas"
    );

    this.instEmpYOtrosTem = filtroInsEmpTem.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor12 = this.instEmpYOtrosTem.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalInstEmpTem = [total1General12, total1Policia12, total1SerPen12, total1Medicos12, total1Enfermeria12, total1Justicia12, total1Vial12, total1Superior12, total1Legislativo12, total1Resto12, total1DocCar12, total1DocHor12];

    // Filtro para personal suplente quitando el personal de las empresas que no consolidan
    const plantaSup = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Suplente' && e.tipo_organismo !== 'Empresas 2'
    );
    this.suplente = plantaSup.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General2 = this.suplente.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia2 = this.suplente.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen2 = this.suplente.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos2 = this.suplente.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria2 = this.suplente.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia2 = this.suplente.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial2 = this.suplente.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior2 = this.suplente.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo2 = this.suplente.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto2 = this.suplente.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar2 = this.suplente.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor2 = this.suplente.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.total1Sup = [total1General2, total1Policia2, total1SerPen2, total1Medicos2, total1Enfermeria2, total1Justicia2, total1Vial2, total1Superior2, total1Legislativo2, total1Resto2, total1DocCar2, total1DocHor2];

    //Suplente en admi y sector publico

    const filtroAdmiNoFinSup = this.suplente.filter(dato => 
      dato.tipo_organismo !== "Institutos de obra social" && dato.tipo_organismo !== "Empresas"
    );

    this.admiPubNoFinSup = filtroAdmiNoFinSup.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor21 = this.admiPubNoFinSup.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalAdmiPubSup = [total1General21, total1Policia21, total1SerPen21, total1Medicos21, total1Enfermeria21, total1Justicia21, total1Vial21, total1Superior21, total1Legislativo21, total1Resto21, total1DocCar21, total1DocHor21];


    const filtroInsEmpSup = this.suplente.filter(dato => 
      dato.tipo_organismo === "Institutos de obra social" || dato.tipo_organismo === "Empresas"
    );

    this.instEmpYOtrosSup = filtroInsEmpSup.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor22 = this.instEmpYOtrosSup.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalInstEmpSup = [total1General22, total1Policia22, total1SerPen22, total1Medicos22, total1Enfermeria22, total1Justicia22, total1Vial22, total1Superior22, total1Legislativo22, total1Resto22, total1DocCar22, total1DocHor22];


    // Filtro para personal contratado quitando el personal de las empresas que no consolidan
    const plantaCon = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Contrato' && e.tipo_organismo !== 'Empresas 2'
    );
    this.contratos = plantaCon.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General3 = this.contratos.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia3 = this.contratos.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen3 = this.contratos.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos3 = this.contratos.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria3 = this.contratos.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia3 = this.contratos.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial3 = this.contratos.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior3 = this.contratos.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo3 = this.contratos.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto3 = this.contratos.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar3 = this.contratos.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor3 = this.contratos.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.total1Con = [total1General3, total1Policia3, total1SerPen3, total1Medicos3, total1Enfermeria3, total1Justicia3, total1Vial3, total1Superior3, total1Legislativo3, total1Resto3, total1DocCar3, total1DocHor3];

    //contratos en admi y sector publico

    const filtroAdmiNoFinCon = this.contratos.filter(dato => 
      dato.tipo_organismo !== "Institutos de obra social" && dato.tipo_organismo !== "Empresas"
    );

    this.admiPubNoFinCon = filtroAdmiNoFinCon.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor31 = this.admiPubNoFinCon.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalAdmiPubCon = [total1General31, total1Policia31, total1SerPen31, total1Medicos31, total1Enfermeria31, total1Justicia31, total1Vial31, total1Superior31, total1Legislativo31, total1Resto31, total1DocCar31, total1DocHor31];


    const filtroInsEmpCon = this.contratos.filter(dato => 
      dato.tipo_organismo === "Institutos de obra social" || dato.tipo_organismo === "Empresas"
    );

    this.instEmpYOtrosCon = filtroInsEmpCon.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo_organismo === item.tipo_organismo);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor32 = this.instEmpYOtrosCon.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.totalInstEmpCon = [total1General32, total1Policia32, total1SerPen32, total1Medicos32, total1Enfermeria32, total1Justicia32, total1Vial32, total1Superior32, total1Legislativo32, total1Resto32, total1DocCar32, total1DocHor32];

    // Filtro para Becarios quitando el personal de las empresas que no consolidan
    const plantaBec = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Becarios' && e.tipo_organismo !== 'Empresas 2'
    );
    this.becarios = plantaBec.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General4 = this.becarios.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia4 = this.becarios.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen4 = this.becarios.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos4 = this.becarios.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria4 = this.becarios.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia4 = this.becarios.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial4 = this.becarios.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior4 = this.becarios.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo4 = this.becarios.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto4 = this.becarios.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar4 = this.becarios.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor4 = this.becarios.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.total1Bec = [total1General4, total1Policia4, total1SerPen4, total1Medicos4, total1Enfermeria4, total1Justicia4, total1Vial4, total1Superior4, total1Legislativo4, total1Resto4, total1DocCar4, total1DocHor4];

    // Filtro para Residentes quitando el personal de las empresas que no consolidan
    const plantaRes = datosFiltrados.filter(
      (e) => e.tipo_planta === 'Residentes' && e.tipo_organismo !== 'Empresas 2'
    );
    this.residentes = plantaRes.reduce((acc, item) => {
      const existingItem = acc.find((i) => i.descripcion === item.descripcion);
      if (existingItem) {
        existingItem.cantGeneral += item.cantGeneral;
        existingItem.cantPolicia += item.cantPolicia;
        existingItem.cantSerPen += item.cantSerPen;
        existingItem.cantMedicos += item.cantMedicos;
        existingItem.cantEnfermeria += item.cantEnfermeria;
        existingItem.cantJusticia += item.cantJusticia;
        existingItem.cantVial += item.cantVial;
        existingItem.cantSuperior += item.cantSuperior;
        existingItem.cantLegislativo += item.cantLegislativo;
        existingItem.cantResto += item.cantResto;
        existingItem.cantDocCar += item.cantDocCar;
        existingItem.cantDocHor += item.cantDocHor;

      } else {
        acc.push({
          DA: item.DA,
          descripcion: item.descripcion,
          tipo_organismo: item.tipo_organismo,
          cantGeneral: item.cantGeneral,
          cantPolicia: item.cantPolicia,
          cantSerPen: item.cantSerPen,
          cantMedicos: item.cantMedicos,
          cantEnfermeria: item.cantEnfermeria,
          cantJusticia: item.cantJusticia,
          cantVial: item.cantVial,
          cantSuperior: item.cantSuperior,
          cantLegislativo: item.cantLegislativo,
          cantResto: item.cantResto,
          cantDocCar: item.cantDocCar,
          cantDocHor: item.cantDocHor,
        });
      }
      return acc;
    }, []);

    const total1General5 = this.residentes.reduce(
      (acc, item) => acc + item.cantGeneral,
      0
    );
    const total1Policia5 = this.residentes.reduce(
      (acc, item) => acc + item.cantPolicia,
      0
    );
    const total1SerPen5 = this.residentes.reduce(
      (acc, item) => acc + item.cantSerPen,
      0
    );
    const total1Medicos5 = this.residentes.reduce(
      (acc, item) => acc + item.cantMedicos,
      0
    );
    const total1Enfermeria5 = this.residentes.reduce(
      (acc, item) => acc + item.cantEnfermeria,
      0
    );
    const total1Justicia5 = this.residentes.reduce(
      (acc, item) => acc + item.cantJusticia,
      0
    );
    const total1Vial5 = this.residentes.reduce(
      (acc, item) => acc + item.cantVial,
      0
    );
    const total1Superior5 = this.residentes.reduce(
      (acc, item) => acc + item.cantSuperior,
      0
    );
    const total1Legislativo5 = this.residentes.reduce(
      (acc, item) => acc + item.cantLegislativo,
      0
    );
    const total1Resto5 = this.residentes.reduce(
      (acc, item) => acc + item.cantResto,
      0
    );
    const total1DocCar5 = this.residentes.reduce(
      (acc, item) => acc + item.cantDocCar,
      0
    );
    const total1DocHor5 = this.residentes.reduce(
      (acc, item) => acc + item.cantDocHor,
      0
    );
    
    this.total1Res = [total1General5, total1Policia5, total1SerPen5, total1Medicos5, total1Enfermeria5, total1Justicia5, total1Vial5, total1Superior5, total1Legislativo5, total1Resto5, total1DocCar5, total1DocHor5];

    //FIN DE FILTRO
  }

  multiTable(): void {
    /* creación de función que agrega fila */
    function create_gap_rows(ws, nrows) {
      var ref = XLSX.utils.decode_range(ws['!ref']); // busca rango original
      ref.e.r += nrows; // agrega una fila al final
      ws['!ref'] = XLSX.utils.encode_range(ref); // reasigna fila
    }

    /* primera tabla */
    const ws = XLSX.utils.aoa_to_sheet([[this.headers[0]]]);
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table1'), {
      origin: -1,
    });
    create_gap_rows(ws, 1); // espacio de una fila después de la primera tabla

    /* segunda tabla */
    XLSX.utils.sheet_add_aoa(ws, [[this.headers[1]]], { origin: -1 });
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table2'), {
      origin: -1,
    });
    create_gap_rows(ws, 2); // espacio de dos filas después de la segunda tabla

    /* tercera tabla */
    XLSX.utils.sheet_add_aoa(ws, [[this.headers[2]]], { origin: -1 });
    XLSX.utils.sheet_add_dom(ws, document.getElementById('table3'), {
      origin: -1,
    });

    /* creación del libro y exportación */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');
    XLSX.writeFile(wb, 'Comparativo Planta de Personal por DA.xlsx');
  }
}