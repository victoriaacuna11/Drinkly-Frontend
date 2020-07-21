import { Directive, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';


@Directive({
    selector: '[clickedOut]',
})
export class clickedOutDirective{
    
    @Output() public clickOutside = new EventEmitter();

    constructor(private _elementRef: ElementRef){}

    /**
     * Escucha el evento del click, para que cuando se despliegue la lista de filtros, si se hace click en cualquier
     * elemento de la página que no sea esa lista, se oculte la lista
     * @param {HTMLElement} tgt Cualquier elemento de la página sobre el cual se hace click  
     */
    @HostListener('document:click', ['$event.target'])

    public onClick(tgt: HTMLElement){
        if(tgt.id === "search2" || tgt.id==="search"){return;}
        //console.log("target: "+ tgt)
        const isClickedInside = this._elementRef.nativeElement.contains(tgt);
        if(!isClickedInside){
            this.clickOutside.emit(null)
        }
    }
}