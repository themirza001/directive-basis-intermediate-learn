import { Directive, ElementRef, inject, Input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': "onConfirmLeavePage($event)"
    }
})
export class SafeLinkDirective {
    @Input({ required: true, alias: 'appSafeLink' }) queryParam: string = 'myapp'

    //adding a referernce to host element by DI
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef);

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm("Do u want to leave the app")

        if (wantsToLeave) {
            const address = this.hostElementRef.nativeElement.href;
            this.hostElementRef.nativeElement.href = address + `?from=${this.queryParam}`;
            return;
        }

        event.preventDefault();
    }
}