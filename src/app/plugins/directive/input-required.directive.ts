import {Directive, ElementRef} from "@angular/core";
import {FormControl, NgControl} from "@angular/forms";

@Directive({
    selector: '[input-required]'
})
export class InputRequiredDirective {

    constructor(private elementRef: ElementRef, private control : NgControl) {
        console.log("aaaaaa");
        console.log(this.elementRef.nativeElement.getAttribute("value")
        );
        // if (control && control.control) {
        //     control.control.setValidators((c: FormControl) => {
        //         let v = c.value;
        //         console.log(c.value);
        //         if (!v || v.trim() == '') {
        //             return {'required': true};
        //         }
        //         return null;
        //     });
        // }
    }

}
