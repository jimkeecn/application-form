import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseForm } from "./based.form";

interface IAccountType{
    accountTypeId: string;
}

export class AccountTypeForm extends BaseForm {
    constructor() {
        super({
            accountTypeId: new FormControl('', [Validators.required])
        });
    }
}
