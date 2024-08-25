import { Directive, ElementRef, HostListener, Input } from '@angular/core';
@Directive({
  selector: 'img[hideMissing]',
})
export class HideMissingDirective {
  @Input() errorIconURL?: string;
  constructor(private el: ElementRef) {}

  @HostListener('error')
  private onError() {
    if (!this.errorIconURL) {
      this.el.nativeElement.src =
        'assets/icons/share-location-unit-placeholder.svg';
    } else {
      this.el.nativeElement.src = this.errorIconURL;
    }
  }
}
