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
  instEmpYOtrosTem: any[];
  suplente?: any[];
  total1Sup: any[];
  admiPubNoFinSup: any[];
  instEmpYOtrosSup: any[];
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

    const filtroAdmiNoFinPer = this.permanente.filter(dato => {
      dato.tipo_organismo !== "Institutos de obra social" && dato.tipo_organismo !== "Empresas"
    });

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


    const filtroInsEmpPer = this.permanente.filter(dato => {
      dato.tipo_organismo === "Institutos de obra social" && dato.tipo_organismo === "Empresas"
    });

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