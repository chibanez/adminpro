import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // El @Inject(DOCUMENT) me da acceso al DOM de la pagina
  constructor(public settingsService: SettingsService) { }

  ngOnInit() {
    this.inicializarCheck();
  }

  cambiarColor(tema: string, link: any) {

    this.aplicarCheck(link);
    this.settingsService.aplicarTema(tema);

  }

  aplicarCheck(link: any) {
    const selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('working');
    }

    link.classList.add('working');

  }

  inicializarCheck() {
    const selectores: any = document.getElementsByClassName('selector');
    const tema = this.settingsService.ajustes.tema;

    for (let ref of selectores) {
      if (tema === ref.getAttribute('data-theme')) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
