import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
    selector: "[UppercaseLetterAndNumber]"
})
export class UpperCaseLetterAndNumberDirective {



    constructor(private el: ElementRef) {

        var elem = (this.el.nativeElement as HTMLInputElement);

        elem.onkeydown = function (event: KeyboardEvent) {

            var elem = event.currentTarget as HTMLInputElement;

            var keycode = event.which;
            if (event.key.length > 1)
                return;
            if ((keycode > 57 || keycode < 48) && (keycode < 65 || keycode > 90) && (keycode < 96 || keycode > 105))
                event.preventDefault();

            elem["prevSelectionStart"] = elem.selectionStart;
        };

        elem.onkeyup = function (event: KeyboardEvent) {
            var elem = event.currentTarget as HTMLInputElement;

            if (event.key.length > 1)
                return;

            elem.value = elem.value.toUpperCase();

            let selectionStart = event.currentTarget["prevSelectionStart"] + 1;

            (selectionStart > 0) || (selectionStart = 1);

            elem.selectionStart = selectionStart;
            elem.selectionEnd = selectionStart;
        };
    }
}