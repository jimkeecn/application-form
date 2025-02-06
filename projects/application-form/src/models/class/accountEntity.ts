import { FormArray, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";
import { FieldType, FullFormObject, IEntityFields, ValidationType } from "../interface/field_config";
import { Loader, LoaderMixin } from "../shared/loader";
import { ConcreteBaseForm } from "../formgroup/based.form";
import { v4 as uuidv4 } from 'uuid';
import { AccountRelationship } from "../class/accountRelationship";
import { EntityForm } from "../formgroup/entity.form";
import { IEntityCardInfo } from "../interface/entity";

export class AccountEntity{
    readonly id: string;
    private _configs: Partial<IEntityFields> = this.defaultConfig();
    private _relationshipTypeList: AccountRelationship[];
    private _accountType: string;
    private _form: EntityForm;
    private _parentId: string | null;
    set parentId(parentId: string | null) { 
        if(this._parentId){
            throw new Error('Parent Id is already set');
        }
        this._parentId = parentId;
    }
    get parentId() { 
        return this._parentId;
    }
    private _relationshipType: string | null;
    set relationshipType(relationshipType: string | null) { 
        if(this._relationshipType){
            throw new Error('Relationship Type is already set');
        }
        this._relationshipType = relationshipType;
    }
    get relationshipType() { 
        return this._relationshipType;
    }
    private _entityType: string | null;
    set entityType(entityType: string | null) { 
        if(this._entityType){
            throw new Error('Entity Type is already set');
        }
        this._entityType = entityType;
    }
    get entityType() { 
        return this._entityType;
    }

    get form() {
        return this._form;
    }


    constructor(id: string, entityType: string, relationshipType: string, accountType: string, config?: Partial<IEntityFields>) {
        this.id = id;
        this._parentId = null;
        this._relationshipTypeList = [];
        this._relationshipType = relationshipType;
        this._entityType = entityType;
        this._accountType = accountType;
        this._form = new EntityForm();
        if(config){
            this.setConfig(config);
        }
    }

    setConfig(config: Partial<IEntityFields>) { 
        if (config) { 
            function clearAndSetValidators(control: any, validators: any[]) {
                control.setValidators([]); // Clear existing validators
                control.setValidators(validators); // Set new validators
                control.updateValueAndValidity(); // Update value and validity
            }

            function createValidators(validators: any[]){
                return validators
                    .map((validator: ValidationType) => {
                        switch (validator) { 
                            case ValidationType.required:
                                return Validators.required;
                            case ValidationType.email:
                                return Validators.email;
                            case ValidationType.abn:
                                return Validators.pattern(/^(?![0]{11})\d{11}$/);
                            case ValidationType.tfn:
                                return Validators.pattern(/^(?![0]{9})\d{9}$/);
                            case ValidationType.ausMobile:
                                return Validators.pattern(/^04[0-9]{8}$/);
                            case ValidationType.fax:
                                return Validators.pattern(/^[0-9]{10}$/);
                            default:
                                return;
                        }
                    })
            }
            
            this._configs = config;
            let formGroup = this._form.getForm();
            if (this._configs.salutation?.isEnabled) { 
                clearAndSetValidators(formGroup.get('salutation'), createValidators(this._configs.salutation.validation));
            }
            if (this._configs.firstName?.isEnabled) { 
                clearAndSetValidators(formGroup.get('firstName'), createValidators(this._configs.firstName.validation));
            }
            if (this._configs.lastName?.isEnabled) { 
                clearAndSetValidators(formGroup.get('lastName'), createValidators(this._configs.lastName.validation));
            }
            if (this._configs.middleName?.isEnabled) { 
                clearAndSetValidators(formGroup.get('middleName'), createValidators(this._configs.middleName.validation));
            }
            if (this._configs.surname?.isEnabled) { 
                clearAndSetValidators(formGroup.get('surname'), createValidators(this._configs.surname.validation));
            }
            if (this._configs.formaltitle?.isEnabled) { 
                clearAndSetValidators(formGroup.get('formaltitle'), createValidators(this._configs.formaltitle.validation));
            }
            if (this._configs.postNominals?.isEnabled) { 
                clearAndSetValidators(formGroup.get('postNominals'), createValidators(this._configs.postNominals.validation));
            }
            if (this._configs.akas?.isEnabled) { 
                clearAndSetValidators(formGroup.get('akas'), createValidators(this._configs.akas.validation));
            }
            if (this._configs.nonIndividualName?.isEnabled) { 
                clearAndSetValidators(formGroup.get('nonIndividualName'), createValidators(this._configs.nonIndividualName.validation));
            }
            if (this._configs.businessName?.isEnabled) { 
                clearAndSetValidators(formGroup.get('businessName'), createValidators(this._configs.businessName.validation));
            }
            if (this._configs.dateOfBirth?.isEnabled) { 
                clearAndSetValidators(formGroup.get('dateOfBirth'), createValidators(this._configs.dateOfBirth.validation));
            }
            if (this._configs.dateOfDeath?.isEnabled) { 
                clearAndSetValidators(formGroup.get('dateOfDeath'), createValidators(this._configs.dateOfDeath.validation));
            }
            if (this._configs.sex?.isEnabled) { 
                clearAndSetValidators(formGroup.get('sex'), createValidators(this._configs.sex.validation));
            }
            if (this._configs.isPublic?.isEnabled) { 
                clearAndSetValidators(formGroup.get('isPublic'), createValidators(this._configs.isPublic.validation));
            }
            if (this._configs.business?.isEnabled) { 
                clearAndSetValidators(formGroup.get('business'), createValidators(this._configs.business.validation));
            }
            if (this._configs.homePhone?.isEnabled) { 
                clearAndSetValidators(formGroup.get('homePhone'), createValidators(this._configs.homePhone.validation));
            }
            if (this._configs.mobile?.isEnabled) { 
                clearAndSetValidators(formGroup.get('mobile'), createValidators(this._configs.mobile.validation));
            }
            if (this._configs.fax?.isEnabled) { 
                clearAndSetValidators(formGroup.get('fax'), createValidators(this._configs.fax.validation));
            }
            if (this._configs.communicationType?.isEnabled) { 
                clearAndSetValidators(formGroup.get('communicationType'), createValidators(this._configs.communicationType.validation));
            }
            if (this._configs.contactEmail?.isEnabled) { 
                clearAndSetValidators(formGroup.get('contactEmail'), createValidators(this._configs.contactEmail.validation));
            }
            if (this._configs.regulator?.isEnabled) { 
                clearAndSetValidators(formGroup.get('regulator'), createValidators(this._configs.regulator.validation));
            }
            if (this._configs.licenseNo?.isEnabled) { 
                clearAndSetValidators(formGroup.get('licenseNo'), createValidators(this._configs.licenseNo.validation));
            }
            if (this._configs.fatcasStatus?.isEnabled) { 
                clearAndSetValidators(formGroup.get('fatcasStatus'), createValidators(this._configs.fatcasStatus.validation));
            }
            if (this._configs.otherFatcasStatus?.isEnabled) { 
                clearAndSetValidators(formGroup.get('otherFatcasStatus'), createValidators(this._configs.otherFatcasStatus.validation));
            }
            if (this._configs.pepStatus?.isEnabled) { 
                clearAndSetValidators(formGroup.get('pepStatus'), createValidators(this._configs.pepStatus.validation));
            }
            if (this._configs.OtherOrgDetails?.isEnabled) { 
                clearAndSetValidators(formGroup.get('OtherOrgDetails'), createValidators(this._configs.OtherOrgDetails.validation));
            }
        }
    }

    getConfig(): IEntityFields {
        return {
            salutation: this._configs.salutation ?? this.defaultConfig().salutation,
            firstName: this._configs.firstName ?? this.defaultConfig().firstName,
            lastName: this._configs.lastName ?? this.defaultConfig().lastName,
            middleName: this._configs.middleName ?? this.defaultConfig().middleName,
            surname: this._configs.surname ?? this.defaultConfig().surname,
            formaltitle: this._configs.formaltitle ?? this.defaultConfig().formaltitle,
            postNominals: this._configs.postNominals ?? this.defaultConfig().postNominals,
            akas: this._configs.akas ?? this.defaultConfig().akas,
            nonIndividualName: this._configs.nonIndividualName ?? this.defaultConfig().nonIndividualName,
            businessName: this._configs.businessName ?? this.defaultConfig().businessName,
            dateOfBirth: this._configs.dateOfBirth ?? this.defaultConfig().dateOfBirth,
            dateOfDeath: this._configs.dateOfDeath ?? this.defaultConfig().dateOfDeath,
            sex: this._configs.sex ?? this.defaultConfig().sex,
            isPublic: this._configs.isPublic ?? this.defaultConfig().isPublic,
            tax: this._configs.tax ?? this.defaultConfig().tax,
            addresses: this._configs.addresses ?? this.defaultConfig().addresses,
            business: this._configs.business ?? this.defaultConfig().business,
            homePhone: this._configs.homePhone ?? this.defaultConfig().homePhone,
            mobile: this._configs.mobile ?? this.defaultConfig().mobile,
            fax: this._configs.fax ?? this.defaultConfig().fax,
            communicationType: this._configs.communicationType ?? this.defaultConfig().communicationType,
            contactEmail: this._configs.contactEmail ?? this.defaultConfig().contactEmail,
            regulator: this._configs.regulator ?? this.defaultConfig().regulator,
            licenseNo: this._configs.licenseNo ?? this.defaultConfig().licenseNo,
            fatcasStatus: this._configs.fatcasStatus ?? this.defaultConfig().fatcasStatus,
            otherFatcasStatus: this._configs.otherFatcasStatus ?? this.defaultConfig().otherFatcasStatus,
            pepStatus: this._configs.pepStatus ?? this.defaultConfig().pepStatus,
            OtherOrgDetails: this._configs.OtherOrgDetails ?? this.defaultConfig().OtherOrgDetails
        };
    }

    checkConfig() {
        if(this._configs){
            return true;
        }
        return false;
    }

    private setValidators(config: Partial<IEntityFields>) {
        
    }

    private defaultConfig() {
        return {
            salutation: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            firstName: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            lastName: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            middleName: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            surname: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            formaltitle: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            postNominals: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            akas: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            nonIndividualName: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            businessName: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            dateOfBirth: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            dateOfDeath: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            sex: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            isPublic: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            tax: [],
            addresses: [],
            business: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            homePhone: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            mobile: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            fax: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            communicationType: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            contactEmail: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            regulator: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            licenseNo: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            fatcasStatus: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            otherFatcasStatus: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            pepStatus: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
            OtherOrgDetails: {
                isEnabled: false,
                fieldType: FieldType.text,
                label: '',
                helper: '',
                placeholder: '',
                validation: []
            } as FullFormObject,
        } as IEntityFields;
    }

    retrieveEntityCardInfo():IEntityCardInfo {
        const firstName = this.form.getForm().get('firstName')?.value?.trim();
        const lastName = this.form.getForm().get('lastName')?.value?.trim();
        const businessName = this.form.getForm().get('businessName')?.value;

        let name: string;
        
        if (firstName || lastName) {
            name = [firstName, lastName].filter(Boolean).join(' '); // Join only non-empty values
        } else {
            name = businessName || ''; // Use businessName if available, otherwise an empty string
        }

        return {
            id: this.id,
            name,
            relationshipType: this._relationshipType!,
            entityType: this._entityType!
        } as IEntityCardInfo;
    }
    
}