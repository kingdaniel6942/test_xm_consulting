import { Component } from '@angular/core';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ConsultService } from 'src/services/consult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private calendar: NgbCalendar, public consultService: ConsultService) {
    }
    private myChart: am4charts.XYChart;

    modelDate1: NgbDateStruct;
    date1: {year: number, month: number, day: number}

    modelDate2: NgbDateStruct;
    date2: {year: number, month: number, day: number}

    optionSelected:any = this.consultService.opcionesConsulta[0];

    data = [0];

    async consult(){

      this.data = [];

      var dateAux1 = new Date(this.modelDate1.year, this.modelDate1.month - 1, this.modelDate1.day);
      var dateAux2 = new Date(this.modelDate2.year, this.modelDate2.month - 1, this.modelDate2.day);
      this.data = await this.consultService.consult(dateAux1, dateAux2, this.optionSelected);

      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 20;

      let visits = 10;

      chart.data = this.data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "time";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;
      chart.legend = new am4charts.Legend();

      this.myChart = chart;
    }

    onChange(value){
      console.log(value);
    }

    selectToday() {
      this.modelDate1 = this.calendar.getToday();
      this.modelDate2 = this.calendar.getToday();
    }
}
