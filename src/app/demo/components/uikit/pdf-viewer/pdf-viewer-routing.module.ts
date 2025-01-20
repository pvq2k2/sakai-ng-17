import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PdfViewerComponent } from './pdf-viewer.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PdfViewerComponent }
    ])],
    exports: [RouterModule]
})
export class PdfViewerRoutingModule { }