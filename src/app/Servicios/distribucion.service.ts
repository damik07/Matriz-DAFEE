import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'})
export class DistribucionService {

  distribucion?:any=[{
    "fecha": "2022-10-01",
    "codigo": "01",
    "descripcion": "Copa Bruta",
    "importe": 150
  },
  {
    "fecha": "2022-10-01",
    "codigo": "02",
    "descripcion": "LFE",
    "importe": 350
  },
  {
    "fecha": "2022-11-01",
    "codigo": "01",
    "descripcion": "Copa Bruta",
    "importe": 450
  },
  {
    "fecha": "2022-12-01",
    "codigo": "01",
    "descripcion": "Copa Bruta",
    "importe": 550
  },
  {
    "fecha": "2023-11-01",
    "codigo": "01",
    "descripcion": "Copa Bruta",
    "importe": 150
  },
  {
    "fecha": "2023-11-01",
    "codigo": "01",
    "descripcion": "Copa Bruta",
    "importe": 250
  },
  {
    "fecha": "2023-11-01",
    "codigo": "01",
    "descripcion": "Copa Bruta",
    "importe": 100
  }
]

}