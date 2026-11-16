import { Directive, Input } from "@angular/core";

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': "onConfirmLeavePage($event)"
    }
})
export class SafeLinkDirective {
    @Input({ required: true }) queryParam: string = 'myapp'

    onConfirmLeavePage(event: MouseEvent) {
        const wantsToLeave = window.confirm("Do u want to leave the app")

        if (wantsToLeave) {
            const address = (event.target as HTMLAnchorElement).href;
            (event.target as HTMLAnchorElement).href = address + `?from=${this.queryParam}`;
            return;
        }

        event.preventDefault();
    }
}