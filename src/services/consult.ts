import { Injectable } from '@angular/core';
import { RestService } from './rest';

@Injectable()
export class ConsultService {

    public opcionesConsulta:any[] = 
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

    constructor( private rest:RestService) { }

    public async consult(date1:Date, date2:Date, optionSelected:any){

        var totalDays = (date2.getTime() - date1.getTime())/(1000 * 3600 * 24); 
        var firstDateAux = new Date(date1.getTime());
        var lastDateAux = new Date(date2.getTime());
        var result = [];
 
        for(var indice = 0 ; indice < totalDays; indice+=30){

            if(indice + 30 < totalDays){
                lastDateAux.setTime(firstDateAux.getTime() + (30 * 1000 * 3600 * 24));
            }else{
                lastDateAux = new Date(date2.getTime());
            }

            if(lastDateAux.getTime() < firstDateAux.getTime()){
                break;
            }

            var body = {
                MetricId: optionSelected.MetricId, 
                Entity: optionSelected.Entity,
                StartDate: this.formatDate(firstDateAux),
                EndDate: this.formatDate(lastDateAux)
            }
        
            var url = optionSelected.temp;
        
            var response:any = await this.rest.post(url, body);
            for(var i=0; i< response.Items.length; i++){
                var arrayDate = response.Items[i].Date.split("-");
                
                if(url == "hourly"){
        
                  var values:any = Object.values(response.Items[i]["HourlyEntities"][0]["Values"]);
                  var promedio = 0.0;
                  var maximo = -1000000000;
                  var minimo = 1000000000;
                  for(var j=1; j< values.length; j++){
        
                    if(values[j]){
                      promedio += parseFloat(values[j]);
                      maximo = values[j] > maximo ? values[j] : maximo;
                      minimo = values[j] < minimo ? values[j] : minimo;
                    }
                  }
        
                  promedio = promedio/24;
                  var dateResult = new Date(arrayDate[0], arrayDate[1], arrayDate[2], 1);
                  result.push({time: dateResult, value: promedio});
        
                }else if(url == "daily"){
                  var dateResult = new Date(arrayDate[0], arrayDate[1], arrayDate[2], 1);
                  result.push({time: dateResult, value: response.Items[i]["DailyEntities"][0]["Value"]});
                }
            }  

            firstDateAux.setTime(lastDateAux.getTime() + (1000 * 3600 * 24));
        }

        return result; 
    }

    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
      }

}