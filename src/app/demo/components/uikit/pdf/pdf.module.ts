import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PdfComponent } from './pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
    declarations: [PdfComponent],
    imports: [
        PdfViewerModule,
        CommonModule,
        FormsModule,
        MenuModule,
        ButtonModule,
        TooltipModule,
        InputNumberModule,
        DropdownModule
    ],
})
export class PdfModule { }
