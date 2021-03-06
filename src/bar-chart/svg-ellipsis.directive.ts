/**
 * @see https://stackoverflow.com/questions/15975440/add-ellipses-to-overflowing-text-in-svg
 * @example
 * <!-- truncate at 200px -->
 * <svg><svg:text ellipsis [text]="text to truncate" [width]="200"></svg:text></svg>
 */

import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnChanges
} from '@angular/core';

const ELLIPSIS = '\u2026';

@Directive({selector: 'svg text[ellipsis]'})
export class SVGEllipsisDirective implements OnInit, OnChanges {
  @Input() text: string;

  @Input() width: number;

  constructor (private _el: ElementRef) {
  }

  ngOnInit (): void {
    this._textEllipsis(this._el.nativeElement);
  }
  ngOnChanges (): void {
    this._textEllipsis(this._el.nativeElement);
  }

  private _textEllipsis (el: SVGTextContentElement) {
    let text = this.text;
    const width = this.width;
    if (typeof el.getSubStringLength !== 'undefined') {
      el.textContent = text;
      let len = text.length;
      if (el.getSubStringLength(0, len) > width) {
        console.log("OUT OF BOUNDS");
        while (el.getSubStringLength(0, len--) > width + 10) {
        }
        el.textContent = text.slice(0, len) + ELLIPSIS;
      }
      //var itemTitle = new SVGTitleElement();
      var itemTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
      itemTitle.textContent = text;
      el.appendChild(itemTitle);
    } else if (typeof el.getComputedTextLength !== 'undefined') {
      while (el.getComputedTextLength() > width + 10) {
        text = text.slice(0, -1);
        el.textContent = `${text}${ELLIPSIS}`;
      }
      var itemTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
      itemTitle.textContent = text;
      el.appendChild(itemTitle);
    } else {
      // the last fallback
      while (el.getBBox().width > width + 10) {
        text = text.slice(0, -1);
        // we need to update the textContent to update the boundary width
        el.textContent = `${text}${ELLIPSIS}`;
      }
      var itemTitle = document.createElementNS("http://www.w3.org/2000/svg", "title");
      itemTitle.textContent = text;
      el.appendChild(itemTitle);
    }
  }
}
