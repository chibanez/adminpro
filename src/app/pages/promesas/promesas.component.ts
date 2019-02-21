import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    // this.contar3().then(
    //   (mensaje) => console.log('TERMINO', mensaje)
    // ).catch(
    //   error => console.error('Error en promesa', error)
    // );

  }

  contar3(): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3)   {
          // reject('Pincho mal');
          resolve(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

  ngOnInit() {
  }

}
