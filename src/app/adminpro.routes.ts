
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Graficas1Component } from './pages/graficas1/graficas1.component';
import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './login/register.component';

const appRoutes: Routes = [
  { path: '',
    component: PagesComponent,
    children: [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: DashboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'graficas1', component: Graficas1Component }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PagenotfoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });

