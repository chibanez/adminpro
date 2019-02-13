import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  // El 'nombre' me determina como se va a llamar el atributo al llamarlo desde afuera
  @Input('nombre') leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

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

    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  onChanges(evento: number) {
    
    if (evento > 100) {
      this.progreso = 100;
    }
    if (evento == null || evento < 0) {
      this.progreso = 0;
    }
  
    //Fuerzo a que el texto del input sea el valor que yo estoy mandando para afuera (por mas que ingrese 233333 va a decir siempre 100 el input)
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }
}
