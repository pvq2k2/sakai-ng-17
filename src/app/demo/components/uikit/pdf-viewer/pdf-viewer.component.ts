import { Component, ChangeDetectionStrategy, HostListener, ViewChild } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData, PDFSource, ZoomScale, PdfViewerComponent as PdfViewer } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerService, pdfDefaultOptions } from 'ngx-extended-pdf-viewer';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfViewerComponent {
  src: string = '/assets/pdfs/Bootstrap-vs-Material-Design-vs-Prime-vs-Tailwind.pdf';
  /** In most cases, you don't need the NgxExtendedPdfViewerService. It allows you
   *  to use the "find" api, to extract text and images from a PDF file,
   *  to print programmatically, and to show or hide layers by a method call.
  */
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

    pdfSrc: string | Uint8Array | PDFSource = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  
    zoomOptions: { name: string; value: ZoomScale | number }[] = [
      { name: '200%', value: 2 },
      { name: '150%', value: 1.5 },
      { name: '100%', value: 1 },
      { name: '70%', value: 0.7 },
      { name: '50%', value: 0.5 },
      { name: 'Fit width', value: 'page-width' as ZoomScale },
      { name: 'Fit height', value: 'page-height' as ZoomScale },
      { name: 'Page fit', value: 'page-fit' as ZoomScale },
    ];
  
    items = [
      { label: 'PDF' },
      { label: 'Excel' },
      { label: 'Word' }
    ];
  
  
    totalPages: number = 0;
    zoomSelected: ZoomScale | number = 1;
  
  
    error: any;
    page: number = 1;
    rotation: number = 0;
    zoom: number = 1;
    zoomScale: ZoomScale = 'page-width';
    originalSize = false;
    pdf: any;
    renderText = true;
    progressData!: PDFProgressData;
    isLoaded = false;
    stickToPage = false; // showAll === true => enlable control stickToPage
    showAll = true;
    autoresize = true;
    fitToPage = false; // origial size === true => enlable control fitToPage
    outline!: any[];
    isOutlineShown = false;
    pdfQuery = '';
    mobile = false;
  
  
  
    zoomIn() {
      if (this.zoom === 2) return;
      this.zoom = parseFloat((this.zoom + 0.1).toFixed(1));
  
      console.log("zoomIn", this.zoom);
    }
    zoomOut() {
      if (this.zoom === 0.1) return;
      this.zoom = parseFloat((this.zoom - 0.1).toFixed(1));
      console.log("zoomOut", this.zoom);
    }
    handleChangeZoomOption(event: DropdownChangeEvent) {
      if (typeof event.value === 'string') {
        this.zoomScale = event.value as ZoomScale;
        console.log(this.zoomScale, this.zoom);
        return;
      }
  
      this.zoom = event.value;
  
      console.log(this.zoomScale, this.zoom);
      
    }
  
  
  
    // printPDF() {
    //   const pdfWindow = window.open(this.pdfSrc, '_blank'); // Mở file PDF trong tab/cửa sổ mới
    //   if (pdfWindow) {
    //     pdfWindow.onload = () => {
    //       pdfWindow.print(); // Tự động mở giao diện in
    //     };
    //   }
    // }
  
    @ViewChild(PdfViewer)
    private pdfComponent!: PdfViewer;
  
    ngOnInit() {
      if (window.screen.width <= 768) {
        this.mobile = true;
      }
    }
  
    // Load pdf
    loadPdf() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', '/assets/pdf-test.pdf', true);
      xhr.responseType = 'blob';
  
      xhr.onload = (e: any) => {
        console.log(xhr);
        if (xhr.status === 200) {
          const blob = new Blob([xhr.response], { type: 'application/pdf' });
          this.pdfSrc = URL.createObjectURL(blob);
        }
      };
  
      xhr.send();
    }
  
  
    /**
     * Set custom path to pdf worker
     */
    setCustomWorkerPath() {
      (window as any).pdfWorkerSrc = '/lib/pdfjs-dist/build/pdf.worker.js';
    }
  
    // incrementPage(amount: number) {
    //   this.page += amount;
    // }
  
    // incrementZoom(amount: number) {
    //   this.zoom += amount;
    // }
  
    // rotate(angle: number) {
    //   this.rotation += angle;
    // }
  
    nextPage() {
      this.page++;
    }
  
    prevPage() {
      this.page--;
    }
  
    handleRotation() {
      if (this.rotation + 90 > 270) {
        this.rotation = 0;
        return;
      }
  
      this.rotation += 90;
    }
  
    /**
     * Render PDF preview on selecting file
     */
    onFileSelected() {
      const $pdf: any = document.querySelector('#file');
  
      if (typeof FileReader !== 'undefined') {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.pdfSrc = e.target.result;
        };
  
        reader.readAsArrayBuffer($pdf.files[0]);
      }
    }
  
    /**
     * Get pdf information after it's loaded
     * @param pdf pdf document proxy
     */
    afterLoadComplete(pdf: PDFDocumentProxy) {
      this.pdf = pdf;
      this.totalPages = pdf.numPages;
      // this.isLoaded = true;
      this.loadOutline();
    }
  
    /**
     * Get outline
     */
    loadOutline() {
      this.pdf.getOutline().then((outline: any[]) => {
        this.outline = outline;
      });
    }
  
    /**
     * Handle error callback
     *
     * @param error error message
     */
    onError(error: any) {
      this.error = error; // set error
  
      if (error.name === 'PasswordException') {
        const password = prompt(
          'This document is password protected. Enter the password:'
        );
  
        if (password) {
          this.error = null;
          this.setPassword(password);
        }
      }
    }
  
    setPassword(password: string) {
      let newSrc: PDFSource;
  
      if (this.pdfSrc instanceof ArrayBuffer) {
        newSrc = { data: this.pdfSrc as any };
        // newSrc = { data: this.pdfSrc };
      } else if (typeof this.pdfSrc === 'string') {
        newSrc = { url: this.pdfSrc };
      } else {
        newSrc = { ...this.pdfSrc };
      }
  
      newSrc.password = password;
  
      this.pdfSrc = newSrc;
    }
  
    /**
     * Pdf loading progress callback
     * @param progressData pdf progress data
     */
    onProgress(progressData: PDFProgressData) {
      console.log(progressData);
      this.progressData = progressData;
  
      this.isLoaded = progressData.loaded >= progressData.total;
      this.error = null; // clear error
    }
  
    getInt(value: number): number {
      return Math.round(value);
    }
  
    /**
     * Navigate to destination
    * @param destination pdf navigate to
    */
  navigateTo(destination: any) {
    this.pdfComponent.pdfLinkService.goToDestination(destination);
  }

  /**
   * Scroll view
   */
  scrollToPage() {
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: 3
    });
  }

  /**
   * Page rendered callback, which is called when a page is rendered (called multiple times)
   *
   * @param e custom event
   */
  pageRendered(e: CustomEvent) {
    console.log('(page-rendered)', e);
  }

  /**
   * Page initialized callback.
   *
   * @param {CustomEvent} e
   */
  pageInitialized(e: CustomEvent) {
    console.log('(page-initialized)', e);
  }

  /**
   * Page change callback, which is called when a page is changed (called multiple times)
   *
   * @param e number
   */
  pageChange(e: number) {
    console.log('(page-change)', e);
  }

  searchQueryChanged(newQuery: string) {
    const type = newQuery !== this.pdfQuery ? '' : 'again';
    this.pdfQuery = newQuery;

    this.pdfComponent.eventBus.dispatch('find', {
      type,
      query: this.pdfQuery,
      highlightAll: true,
      caseSensitive: false,
      phraseSearch: true,
      // findPrevious: undefined,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.mobile = (event.target as Window).innerWidth <= 768;
  }
}
