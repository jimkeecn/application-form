export interface FullFormObject{
    isEnabled: boolean; // Determines if the field is enabled. Disabled fields will not appear in the form.
    fieldType: FieldType; // Determines the type of field (e.g., text, dropdown, datepicker);
    label: string; // The label that will be displayed for the field. for checkbox will be the checkbox label.
    helper: string; // Tooltip or helper text that provides more information about the field (e.g., displayed as a question mark icon).
    placeholder: string; // Placeholder text shown in the field when no value is entered.
    validation: ValidationType[]; // An array of validation rules applied to this field. 
}


// FieldType is an enum that defines the type of field that will be displayed in the form. 
export enum FieldType { 
    text = 'text', // Regular text input field.
    dropdown = 'dropdown', // Dropdown field however it does not allow user to do search
    autoComplete = 'auto-complete', // dropdown with auto complete search function allow user to search through long list of options
    datePicker = 'datepicker', // Single Date Picker, date range is not support at the moment
    multipleSelect = 'multiple-select', // Dropdown field that allows multiple selections.
    checkbox = 'checkbox', // Checkbox field.
    address = 'address', // Address field that allows user to search for an address.
}

//ValidationType is an enum that defines the type of validation that will be applied to the field.
export enum ValidationType {
    required = 'required', // The field is required.
    email = 'email', // The field must be a valid email address.
    abn = 'abn',    // The field must be a valid ABN.
    tfn = 'tfn',   // The field must be a valid TFN.
    ausMobile = 'aus-mobile',   // The field must be a valid Australian mobile number.
    fax = 'fax',  // The field must be a valid fax number.
    //will add more depends on business logic
}

export interface IEntityFields { 
    salutation: FullFormObject;
    firstName: FullFormObject;
    lastName: FullFormObject;
    middleName: FullFormObject;
    surname: FullFormObject;
    formaltitle: FullFormObject;
    postNominals: FullFormObject;
    akas: FullFormObject;
    nonIndividualName: FullFormObject;
    businessName: FullFormObject;
    dateOfBirth: FullFormObject;
    dateOfDeath: FullFormObject;
    sex: FullFormObject;
    isPublic: FullFormObject;
    tax: IEntityTax[];
    addresses: IEntityAddressFields[];
    business: FullFormObject;
    homePhone: FullFormObject;
    mobile: FullFormObject;
    fax: FullFormObject;
    communicationType: FullFormObject;
    contactEmail: FullFormObject;
    regulator: FullFormObject;
    licenseNo: FullFormObject;
    fatcasStatus: FullFormObject;
    otherFatcasStatus: FullFormObject;
    pepStatus: FullFormObject;
    OtherOrgDetails: FullFormObject;
}


export interface IEntityAddressFields{
    addressType: string; //Business, Home, Principal Place of Business, Registered Office, Mailing, Other
    fullAddress: FullFormObject;
    careOf: FullFormObject;
    role: FullFormObject;
    level: FullFormObject;
    building: FullFormObject;
    unitType: FullFormObject;
    unitNo: FullFormObject;
    streetNo: FullFormObject;
    streeName: FullFormObject;
    streetType: FullFormObject;
    postBox: FullFormObject;
    suburb: FullFormObject;
    state: FullFormObject;
    postCode: FullFormObject;
    country: FullFormObject;
}

export interface IEntityTax{
    abnOrSimlilar: FullFormObject;
    tfn: FullFormObject;
    nationality: FullFormObject;
    isCitizen: FullFormObject;
    isResident: FullFormObject;
    tinOrGiin: FullFormObject;
    noTinGiinReason: FullFormObject;
}

