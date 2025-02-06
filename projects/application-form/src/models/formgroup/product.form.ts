import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "./based.form";

interface IProduct{
    productId: number | string;
    productPds: boolean;
}

export class ProductForm extends BaseForm {
    constructor() {
        super({
            productId: new FormControl('', [Validators.required]),
            productPds: new FormControl('', [Validators.required, Validators.requiredTrue])
        });
    }

    setPdsValue(value: boolean) { 
        this.form.get('productPds')?.setValue(value);
    }
}