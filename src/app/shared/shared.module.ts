
import { NgModule } from '@angular/core';
import { PagenotfoundComponent } from '../shared/pagenotfound/pagenotfound.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';

@NgModule({
    declarations: [
        PagenotfoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ],
    exports: [
        PagenotfoundComponent,
        HeaderComponent,
        SidebarComponent,
        BreadcrumbsComponent,
    ]
})

export class SharedModule {}
