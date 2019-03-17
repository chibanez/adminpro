import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuard, VerificaTokenGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const pagesRoutes: Routes = [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
        // Este Guard deberia estar en todas las paginas que utilizan token, asi cuando
        // detecto que se esta por vences lo renuevo automaticamente
        canActivate: [ VerificaTokenGuard ],
        data: {titulo: 'Dashboard'}
      },
      { path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'} },
      { path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'} },
      { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
      { path: 'rxjs', component: RxjsComponent, data: {titulo: 'Observables'} },
      { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Cuenta'} },
      { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'} },
      { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
      // Mantenimientos
      { path: 'usuarios',
        component: UsuariosComponent,
        data: {titulo: 'Mantenimiento de Usuarios'},
        canActivate: [ AdminGuard ]
      },
      { path: 'hospitales', component: HospitalComponent, data: {titulo: 'Mantenimiento de Hospitales'} },
      { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'} },
      { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'} }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
