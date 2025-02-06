import { FormArray, FormControl, FormGroup } from "@angular/forms";
import { IEntityFields } from "../interface/field_config";
import { LoaderMixin } from "../shared/loader";
import { BaseForm, ConcreteBaseForm } from "./based.form";
import { v4 as uuidv4 } from 'uuid';
import { AccountRelationship } from "../class/accountRelationship";

export class EntityForm extends BaseForm {
    constructor() {
        super({
            salutation: new FormControl(''),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            middleName: new FormControl(''),
            surname: new FormControl(''),
            formaltitle: new FormControl(''),
            postNominals: new FormControl(''),
            akas: new FormControl(''),
            nonIndividualName: new FormControl(''),
            businessName: new FormControl(''),
            dateOfBirth: new FormControl(''),
            dateOfDeath: new FormControl(''),
            sex: new FormControl(''),
            isPublic: new FormControl(''),
            tax: new FormArray<any>([]),
            addresses: new FormArray<any>([]),
            business: new FormControl(''),
            homePhone: new FormControl(''),
            mobile: new FormControl(''),
            fax: new FormControl(''),
            communicationType: new FormControl(''),
            contactEmail: new FormControl(''),
            regulator: new FormControl(''),
            licenseNo: new FormControl(''),
            fatcasStatus: new FormControl(''),
            otherFatcasStatus: new FormControl(''),
            pepStatus: new FormControl(''),
            OtherOrgDetails: new FormControl('')
        });
    }

    getForm(){
        return this.form;
    }
}