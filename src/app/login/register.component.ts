import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// Utilizo el sweet alert para mostrar mensajes (alerts) mas lindos
// npm install sweetalert --save
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router ) { }

  // Con esta funcion valido que 2 campos sean iguales
  sonIguales( campo1: string, campo2: string) {

    return ( group: FormGroup ) => {

        let pass1 = group.controls[campo1].value;
        let pass2 = group.controls[campo2].value;

        if ( pass1 === pass2 ) {
          return null;
        }

        return {
          sonIguales: true
        };
    };
  }

  ngOnInit() {
    // Esta funcion la agregamos modificando el custom.js que se importa en el index.html
    // Es para forzar la recarga de los plugins cuando nosotro queramos
    // Si no lo hacemos, los plugins se cargan solo una vez en el login y no se recargan para el sidebar
    // por lo que los menus expansibles no funcionan
    // Para usarla tengo que hacer el declare function init_plugins();
    // Este declare es la forma de ejecutar funciones de archivos js ajenos a angular
    init_plugins();

    this.forma = new FormGroup({
      nombre: new FormControl( null, Validators.required ),
      correo: new FormControl( null, [Validators.required, Validators.email ]),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      condiciones: new FormControl( false )
    }, { validators:  this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Carlos Hernan Ibañez',
      correo: 'cibanez@gmail.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }


  registrarUsuario() {
    if ( !this.forma.valid ) {
      return;
    }

    if ( !this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }
    console.log(this.forma.value);
    console.log('Formulario valido', this.forma.valid);

    let usuario = new Usuario (
      this.forma.value.nombre,
      this.forma.value.correo,
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/login']);
    });
  }
}
