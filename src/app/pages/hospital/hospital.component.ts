import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Validators } from '@angular/forms';
// import swal from 'sweetalert';
declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  desde: number = 0;

  constructor(public modalUploadService: ModalUploadService,
              public hospitalService: HospitalService ) { }

  ngOnInit() {
    this.cargarHospitales();

    // Esta notificacion me avisa que se actualizo la imagen asi cargo nuevamente los datos
    this.modalUploadService.notificacion.subscribe( resp => {
      this.cargarHospitales();
    });
  }

  cargarHospitales() {
    this.cargando = true;
    this.hospitalService.cargarHospitales( this.desde ).subscribe(
      (resp: any) => {
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
      }
    );
  }

  cambiarDesde ( valor: number ) {

    let desde = this.desde + valor;
    if ( desde >= this.totalRegistros ) {
      valor = 0;
    }
    if ( desde < 0 )  {
      valor = 0;
    }

    this.desde += valor;
    this.cargarHospitales();

  }
  buscarHospitales( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
    } else {
      this.cargando = true;
      this.hospitalService.buscarHospitales( termino ).subscribe(
        (hospitales: Hospital[]) => {
          this.hospitales = hospitales;
          this.cargando = false;
        }
      );
    }

  }

  borrarHospital ( hospital: Hospital ) {

    swal(
      {
        title: '¿Esta seguro?',
        text: 'Esta a punto de borrar al hospital ' + hospital.nombre,
        icon: 'warning',
        buttons: ['Cancelar', 'Aceptar'],
        dangerMode: true
      }
    ).then((borrar) => {
      if ( borrar ) {

        this.hospitalService.borrarHospital( hospital._id ).subscribe(
          resp => {
            swal('Hospital Borrado', 'El hospital ha sido eliminado correctamente', 'success');
            this.cargarHospitales();
          }
        );
      }
    });
  }

  guardarHospital ( hospital: Hospital ) {
    this.hospitalService.actualizarHospital( hospital ).subscribe();
  }

  mostrarModal( id: string ) {
    this.modalUploadService.mostrarModal('hospitales', id);
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital a crear',
      content: 'input',
      icon: 'info',
      button: {
        text: 'Aceptar',
        closeModal: true,
      },
      dangerMode: true
    })
    .then((value: string) => {
      if ( !value || value.length === 0 ) {
        return;
      }
      this.hospitalService.crearHospital(value).subscribe(
        () => this.cargarHospitales()
      );
    });
  }
}
