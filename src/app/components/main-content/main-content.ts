import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { Folder } from '../../interfaces/folder.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MainService } from '../../services/api/main';
import { RemoveExtensionPipe } from '../../pipe/remove-extension.pipe';
import panzoom, { PanZoom } from 'panzoom';

@Component({
  selector: 'app-main-content',
  standalone: true,
  templateUrl: './main-content.html',
  imports: [RemoveExtensionPipe],
  styleUrl: './main-content.css'
})
export class MainContent {
  safeLink: SafeResourceUrl | null = null;
  title: string = "Contenido Principal";
  isHtml = false;
  isImage = false;

  private _activeCategory?: Folder;
  private sanitizer = inject(DomSanitizer);
  private service = inject(MainService);

  get activeCategory(): Folder | undefined { return this._activeCategory; }

  @ViewChild('panzoomContainer', { static: false }) panzoomContainer!: ElementRef;
  private panzoomInstance: PanZoom | null = null;

  @Input()
  set activeCategory(cat: Folder | undefined) {
    this._activeCategory = cat;

    if (cat) {
      const raw = cat.link?.trim();
      if (!raw) {
        this.safeLink = null;
        return;
      }

      const extension = raw.split('.').pop()?.toLowerCase();
      this.isHtml = extension === 'html';
      this.isImage = ['png', 'jpg', 'jpeg', 'svg'].includes(extension || '');

      if (this.isImage) {
        setTimeout(() => this.initPanzoom(), 0);
      } else {
        this.destroyPanzoom();
      }

      const safeUrl = `${this.service.baseUrl}${raw}`;
      this.safeLink = this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
      this.title = cat?.name ?? "Contenido Principal";


    }
  }

  private initPanzoom() {
    if (this.panzoomContainer && !this.panzoomInstance) {
     this.panzoomInstance = panzoom(this.panzoomContainer.nativeElement, {
        
        minZoom: 1, 
        maxZoom: 5,
        bounds: true,
        boundsPadding: 0, 
        
});

    }
  }

  private destroyPanzoom() {
    if (this.panzoomInstance) {
      this.panzoomInstance.dispose();
      this.panzoomInstance = null;
    }
  }
}
