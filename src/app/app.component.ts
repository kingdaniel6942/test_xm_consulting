import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private calendar: NgbCalendar) {
    }
    model: NgbDateStruct;
    date: {year: number, month: number}

    opcionesConsulta:any[] = 
    [
      { MetricId: 'Gene', description: 'Generacion Real horaria', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'Gene', description: 'Generacion Real por Recurso horaria', Entity: 'Recurso', temp: 'hourly' },
      { MetricId: 'Gene', description: 'Generacion por tipo de despacho horaria', Entity: 'Renovabilidad', temp: 'hourly' },
      { MetricId: 'DemaCome', description: 'Demanda Comercial horaria', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'DemaCome', description: 'Demanda Comercial por Agente horaria', Entity: 'Agente', temp: 'hourly' },
      { MetricId: 'AporEner', description: 'Aportes Energia diaria', Entity: 'Sistema', temp: 'daily' },
      { MetricId: 'PrecEscaAct', description: 'Precio de Escasez de Activacion diaria', Entity: 'Sistema', temp: 'daily' },
      { MetricId: 'ConsCombustibleMBTU', description: 'Consumo Combustible Despacho Central horarios', Entity: 'Recurso', temp: 'hourly' },
      { MetricId: 'PrecOferDesp', description: 'Precio de Oferta del Despacho horario', Entity: 'Recurso', temp: 'hourly' },
      { MetricId: 'PrecBolsNaci', description: 'Precio de Bolsa Nacional horario', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'MaxPrecOferNal', description: 'Máximo Precio de Oferta Nacional horario', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'RestAliv', description: 'Restricciones Aliviada horario', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'GeneIdea', description: 'Generacion Ideal sistema horario', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'GeneIdea', description: 'Generacion Ideal recurso horario', Entity: 'Recurso', temp: 'hourly' },
      { MetricId: 'VoluUtilDiarEner', description: 'Volumen Util Diario', Entity: 'Sistema', temp: 'daily' },
      { MetricId: 'RemuRealIndiv', description: 'RRID diario', Entity: 'Sistema', temp: 'daily' },
      { MetricId: 'CapEfecNeta', description: 'Listado de recursos térmicos mensuales', Entity: 'Sistema', temp: 'annual' },
      { MetricId: 'VentContEner', description: 'Ventas en Contratos Energía horario', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'VentContEner', description: 'Ventas en Contratos Energía por Agente horario', Entity: 'Agente', temp: 'hourly' },
      { MetricId: 'CompContEner', description: 'Compras en Contrato Energía horario', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'CompContEner', description: 'Compras en Contrato Energía por Agente horario', Entity: 'Agente', temp: 'hourly' },
      { MetricId: 'CompBolsNaciEner', description: 'Compras en Bolsa Nacional Energía horario', Entity: 'Sistema', temp: 'hourly' },
      { MetricId: 'CompBolsNaciEner', description: 'Compras en Bolsa Nacional Energía por Agente horario', Entity: 'Agente', temp: 'hourly' },
      { MetricId: 'PrecPromContRegu', description: 'Precio Promedio Contratos Regulado diario', Entity: 'Sistema', temp: 'daily' },
      { MetricId: 'PrecPromContNoRegu', description: 'Precio Promedio Contratos No Regulado diario', Entity: 'Sistema', temp: 'daily' }
    ];

    optionSelected:any = this.opcionesConsulta[0];

    async consult(option){
      console.log(this.optionSelected);
    }

    onChange(value){
      console.log(value);
    }
    
    selectToday() {
      this.model = this.calendar.getToday();
    }
}
