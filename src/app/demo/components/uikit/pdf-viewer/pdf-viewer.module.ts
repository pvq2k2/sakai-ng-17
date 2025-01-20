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
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    imports: [
        CommonModule,
        PdfViewerRoutingModule,
        NgxExtendedPdfViewerModule,
        InputTextModule,
        MenuModule,
        ButtonModule,
        TabViewModule,
        PdfViewerModule,
        CommonModule,
        FormsModule,
        TooltipModule,
        InputNumberModule,
        DropdownModule
    ],
    declarations: [PdfViewerComponent]
})
export class DemoPdfViewerModule { }
