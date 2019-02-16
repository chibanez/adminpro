import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styles: []
})
export class GraficodonaComponent implements OnInit {

  @Input('leyendas') public doughnutChartLabels: string[] = [];
  @Input('datos') public doughnutChartData: number[] = [];
  @Input('tipo') public doughnutChartType: string = 'doughnut';
  @Input('titulo') public titulo: string = 'Sin Título';

  constructor() {}

  ngOnInit() {
  }

}
