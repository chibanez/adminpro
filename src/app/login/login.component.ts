import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
    // Esta funcion la agregamos modificando el custom.js que se importa en el index.html
    // Es para forzar la recarga de los plugins cuando nosotro queramos
    // Si no lo hacemos, los plugins se cargan solo una vez en el login y no se recargan para el sidebar
    // por lo que los menus expansibles no funcionan
    // Para usarla tengo que hacer el declare function init_plugins();
    // Este declare es la forma de ejecutar funciones de archivos js ajenos a angular
    init_plugins();

    this.googleInit();

    // Inicializo el campo de correo con el email del usuario si es que decidio que se lo "recuerde"
    // Si el email viene undefined devuelvo '' (para eso los ||)
    this.email = localStorage.getItem('email') || '';
    if ( localStorage.getItem('email') ) {
      this.recuerdame = true;
    }

  }

  googleInit() {

    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '269983454675-a1q5hqtnc5v42pochh9psqo52mnn6blr.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin ( document.getElementById('btnGoogle'));
    });
  }

  attachSignin ( element ) {
    this.auth2.attachClickHandler ( element, {}, googleUser => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle( token )
        .subscribe( resp => window.location.href = '#/dashboard');
        // Normalmente deberia redireccionar con:
        // .subscribe( resp => this.router.navigate(['/dashboard']));
        // Si llego a tener problemas de refresco de la pantalla destino, probar haciendo una redireccion
        // "manual" con vanilla javascript:
        // .subscribe( resp => window.location.href = '#/dashboard');
        // Para otras soluciones mejores ver: https://www.udemy.com/angular-avanzado-fernando-herrera/learn/v4/questions/3956704

    });
  }


  ingresar( forma: NgForm ) {
    // console.log(forma.valid);
    // console.log(forma.value);

    if ( forma.invalid ) {
      return;
    }
    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    // Aca si vuelve bien el subscribe ya doy por bueno el login y navego adentro del sitio
    // Si falla el login va a devolver un error, que lo voy a manejar
    this.usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe( resp => this.router.navigate(['/dashboard']));

  }
}
