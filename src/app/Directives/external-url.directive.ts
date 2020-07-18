import { Directive, HostListener, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
    selector: 'a[appExternalUrl]',
})
export class ExternalUrlDirective {
    constructor(private el: ElementRef, private router: Router) {}

    /**
     * Escucha el evento del click, toma el href del elemento que contiene esta directiva (cuando es clickeado),
     * y navega a ese url. Usado para la navegación a otras páginas
     * @param {Event} event el evento de click
     */
    @HostListener('click', ['$event'])
    clicked(event: Event) {
        const url = this.el.nativeElement.href;
        if (!url) {
            return;
        }

        this.router.navigate(['/externalRedirect', { externalUrl: url }], {
            skipLocationChange: true,
        });

        event.preventDefault();
    }
}