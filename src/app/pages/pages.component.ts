import { Component, OnInit } from '@angular/core';
declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // Esta funcion la agregamos modificando el custom.js que se importa en el index.html
    // Es para forzar la recarga de los plugins cuando nosotro queramos
    // Si no lo hacemos, los plugins se cargan solo una vez en el login y no se recargan para el sidebar
    // por lo que los menus expansibles no funcionan
    // Para usarla tengo que hacer el declare function init_plugins();
    // Este declare es la forma de ejecutar funciones de archivos js ajenos a angular
    init_plugins();
  }

}
