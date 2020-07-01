import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';


@Directive({
    selector: '[clickedOut]',
})
export class clickedOutDirective{

    @Output() public clickOutside = new EventEmitter();

    constructor(private _elementRef: ElementRef){

    }

    @HostListener('document:click', ['$event.target'])

    public onClick(tgt){
        if(tgt.id === "search"){return;}
        const isClickedInside = this._elementRef.nativeElement.contains(tgt);
        if(!isClickedInside){
            this.clickOutside.emit(null)
        }
    }
}