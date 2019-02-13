import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // El 'nombre' me determina como se va a llamar el atributo al llamarlo desde afuera
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  // En el constructor todavia esta vigente el valor por defecto
  constructor() { }

  // En ngOnInit ya me toma el valor del @Input
  ngOnInit() {
  }

  actualizarValor(valor: number) {
    // Le hago un Number() porque cuando ingreso el valor del campo de texto me viene en tipo String y sale mal la suma/resta
    this.progreso = Number(this.progreso) + valor;
    if (this.progreso > 100) {
      this.progreso = 100;
    }
    if (this.progreso < 0) {
      this.progreso = 0;
    }
  }

}
