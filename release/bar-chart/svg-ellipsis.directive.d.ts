/**
 * @see https://stackoverflow.com/questions/15975440/add-ellipses-to-overflowing-text-in-svg
 * @example
 * <!-- truncate at 200px -->
 * <svg><svg:text ellipsis [text]="text to truncate" [width]="200"></svg:text></svg>
 */
import { ElementRef, OnInit, OnChanges } from '@angular/core';
export declare class SVGEllipsisDirective implements OnInit, OnChanges {
    private _el;
    text: string;
    width: number;
    constructor(_el: ElementRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    private _textEllipsis(el);
}
