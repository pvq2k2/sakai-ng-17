import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerComponent } from './pdf-viewer.component';
import { PdfViewerRoutingModule } from './pdf-viewer-routing.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
    imports: [
        CommonModule,
        PdfViewerRoutingModule,
        NgxExtendedPdfViewerModule,
        InputTextModule,
        MenuModule,
        ButtonModule,
        TabViewModule,
        PdfViewerModule
    ],
    declarations: [PdfViewerComponent]
})
export class DemoPdfViewerModule { }
