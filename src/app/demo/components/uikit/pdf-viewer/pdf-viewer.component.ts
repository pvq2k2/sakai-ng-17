import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfViewerComponent {
  src: string = '/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf';
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  /** In most cases, you don't need the NgxExtendedPdfViewerService. It allows you
   *  to use the "find" api, to extract text and images from a PDF file,
   *  to print programmatically, and to show or hide layers by a method call.
  */
  items: MenuItem[] = [
    {
      label: "Sửa thông tin hồ sơ",
      // icon: "pi pi-fw pi-file-edit",
      command: () => {
        // this.showDialogThongTinHoSoBHXH("Sửa thông tin hồ sơ", "edit");
      },
      // visible: this.isGranted(this.permissionCreate),
      tooltip: "Sửa thông tin hồ sơ bảo hiểm xã hội",
      tooltipPosition: "top",
    },
    {
      label: "Quá trình tham gia",
      // icon: "pi pi-fw pi-clock",
      command: () => {
        // this.delete();
      },
      // visible: this.isGranted(this.permissionCreate),
      tooltip: "Quá trình tham gia bảo hiểm xã hội",
      tooltipPosition: "top",
    },
    {
      label: "Xóa",
      // icon: "pi pi-fw pi-trash",
      severity: "danger",
      command: () => {
        // this.delete();
      },
      // visible: this.isGranted(this.permissionDelete),
      tooltip: "Xóa",
      tooltipPosition: "top",
    },
  ];
  constructor(private pdfService: NgxExtendedPdfViewerService) {
    /* More likely than not you don't need to tweak the pdfDefaultOptions.
       They are a collecton of less frequently used options.
       To illustrate how they're used, here are two example settings: */
    // pdfDefaultOptions.doubleTapZoomFactor = '150%'; // The default value is '200%'
    // pdfDefaultOptions.maxCanvasPixels = 4096 * 4096 * 5; // The default value is 4096 * 4096 pixels,
    // but most devices support much higher resolutions.
    // Increasing this setting allows your users to use higher zoom factors,
    // trading image quality for performance.
    }

    
}
