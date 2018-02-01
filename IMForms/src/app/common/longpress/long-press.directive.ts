import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appDelayDragLift]' })
export class LongPressDirective {

    dragDelay = 200;
    draggable = false;
    touchTimeout: any;

    @HostListener('touchmove', ['$event'])
    onMove(e: Event) {
        if (!this.draggable) {
            e.cancelBubble = true;
            clearTimeout(this.touchTimeout);
        }
    }

    @HostListener('touchstart', ['$event'])
    onDown(e: Event) {
        this.touchTimeout = setTimeout(() => {
            this.draggable = true;
        }, this.dragDelay);
    }

    @HostListener('touchend', ['$event'])
    onUp(e: Event) {
        clearTimeout(this.touchTimeout);
        this.draggable = false;
    }

    constructor(private el: ElementRef) {}
}
