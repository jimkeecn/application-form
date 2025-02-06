import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";

export abstract class BaseForm {
    form: FormGroup;

    constructor(formConfig: { [key: string]: FormControl | FormArray }) {
        this.form = new FormGroup(formConfig);
    }

    getRawValue() {
        return this.form.getRawValue();
    }

    updateValue(data: any) {
        this.form.patchValue(data);
    }
}

export class ConcreteBaseForm extends BaseForm {
    constructor(formConfig: { [key: string]: FormControl | FormArray }) {
        super(formConfig);
    }
}
