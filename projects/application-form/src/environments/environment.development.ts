
import { IStaticData } from "../models/interface/staticData";

export const environment = {
  production: false,

  // Static data for titles
  titles: [
    { id: 1, name: 'Mr.' },
    { id: 2, name: 'Mrs.' },
    { id: 3, name: 'Miss' },
    { id: 4, name: 'Dr.' },
  ] as any[],

  // Static data for countries
  countries: [
    { id: 1, name: 'Australia' },
    { id: 2, name: 'United States' },
    { id: 3, name: 'Canada' },
    { id: 4, name: 'India' },
  ] as any[],

  // Static data for reference types
  referencesTypes: [
    { id: 1, name: 'Personal' },
    { id: 2, name: 'Professional' },
    { id: 3, name: 'Academic' },
  ] as any[],

  // Static data for security questions
  securityQuestions: [
    { id: 1, name: "What is your mother's maiden name?" },
    { id: 2, name: 'What is the name of your first pet?' },
    { id: 3, name: 'What is the name of the street you grew up on?' },
    { id: 4, name: 'What was your first car?' },
  ] as any[],

  // Static data for communication preferences
  communicationsPreferences: [
    { id: 1, name: 'Email' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'SMS' },
    { id: 4, name: 'Postal Mail' },
  ] as any[],

  //Product data
  products: [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
  ] as any[],

  //Account type data
  accountTypes: [
    { id: 1, name: 'Account Type 1' },
    { id: 2, name: 'Account Type 2' },
    { id: 3, name: 'Account Type 3' },
    { id: 4, name: 'Account Type 4' },
  ] as any[],

  productEntityRestrictions: [
    { entityName: 'Unincorporated Assoc' },
    { entityName: 'Superannuation Fund' },
    { entityName: 'Trust' },
    { entityName: 'Partnership' },
    { entityName: 'Charitable Trust' },
    { entityName: 'Syndicate' },
    { entityName: 'Minor' },
    { entityName: 'Other Entity' },
    { entityName: 'Sole Trader' },
    { entityName: 'Company (Private)' },
    { entityName: 'Joint Holding (Tenants in Common)' },
    { entityName: 'Company (CCIV)' }
  ] as any[],

  relationshipTypes: [
    { index: 1, relationshipName: 'Registered Holder', accountType: 'Company', isDisabled: false, mandatory:true, min: 1, max: 4 },
    { index: 2, relationshipName: 'Beneficial Holder', accountType: 'Company', isDisabled: true , mandatory:true, min: 2, max: 4},
    { index: 3, relationshipName: 'Authority to receive and request information', accountType: 'Company', isDisabled: true , mandatory:false, min: 1, max: 4},
    { index: 4, relationshipName: 'Signatory', accountType: 'Company', isDisabled: true,mandatory:false, min: 1, max: 4 },
    { index: 5, relationshipName: 'Advisor', accountType: 'Company', isDisabled: true ,mandatory:false, min: 1, max: 4},
    { index: 6, relationshipName: 'Verifying Officer', accountType: 'Company', isDisabled: true,mandatory:false, min: 1, max: 4 },
    { index: 7, relationshipName: 'Primary Contact', accountType: 'Company', isDisabled: true,mandatory:false, min: 1, max: 4 },
    { index: 8, relationshipName: 'Alternative Contact', accountType: 'Company', isDisabled: true,mandatory:false, min: 1, max: 4 },
    { index: 9, relationshipName: 'Margin Lender', accountType: 'Company', isDisabled: true,mandatory:false, min: 1, max: 4 },
    { index: 10, relationshipName: 'Authorised to Receive Information', accountType: 'Company', isDisabled: true,mandatory:false, min: 1, max: 4 },
    { index: 11, relationshipName: 'Custodian', accountType: 'Company', isDisabled: true ,mandatory:false, min: 1, max: 4}
  ] as any[],

  entityList: [
    [
      { accountType: 'Company', relationshipName: 'Registered Holder', entityName: 'Unincorporated Assoc', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Registered Holder', entityName: 'Individual', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Registered Holder', entityName: 'Company', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
    ],
    [
      { accountType: 'Company', relationshipName: 'Beneficial Holder', entityName: 'Individual', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Beneficial Holder', entityName: 'Company', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
    ],
    [
      { accountType: 'Company', relationshipName: 'Authority to receive and request information', entityName: 'Super Fund', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Authority to receive and request information', entityName: 'Individual', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Authority to receive and request information', entityName: 'Company', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
    ]
  ],
  formFieldsConfig: [{
    salutation: {
      isEnabled: true,
      fieldType: "dropdown",
      label: "Salutation",
      helper: "Select your salutation",
      placeholder: "Mr, Ms, Dr, etc.",
      validation: ['required']
    },
    firstName: {
      isEnabled: true,
      fieldType: "text",
      label: "First Name",
      helper: "Enter your given name",
      placeholder: "John",
      validation: ['required']
    },
    lastName: {
      isEnabled: true,
      fieldType: "text",
      label: "Last Name",
      helper: "Enter your family name",
      placeholder: "Doe",
      validation: ['required']
    },
    dateOfBirth: {
      isEnabled: true,
      fieldType: "datepicker",
      label: "Date of Birth",
      helper: "Select your birth date",
      placeholder: "DD/MM/YYYY",
      validation: []
    }
  },{
    businessName: {
      isEnabled: true,
      fieldType: "text",
      label: "Business Name",
      helper: "Enter the business name",
      placeholder: "",
      validation: []
    },
    isPublic: {
      isEnabled: true,
      fieldType: "checkbox",
      label: "Public Entity",
      helper: "Check if this is a public entity",
      placeholder: "",
      validation: []
    },
    business: {
      isEnabled: true,
      fieldType: "text",
      label: "Business",
      helper: "Enter business details",
      placeholder: "",
      validation: []
    }
  }],
  subRelationshipTypes: [
    { index: 1, relationshipName: 'Director', accountType: 'Company', isDisabled: false, mandatory:true, min: 1, max: 4 },
    { index: 2, relationshipName: 'Controlling Person', accountType: 'Company', isDisabled: true , mandatory:false, min: 1, max: 4},
    { index: 3, relationshipName: 'Beneficial Owner', accountType: 'Company', isDisabled: true , mandatory:false, min: 1, max: 4},
  ] as any[],
  subEntityList: [
      { accountType: 'Company', relationshipName: 'Director', entityName: 'Individual', mandatory: false, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Beneficial Owner', entityName: 'Individual', mandatory: false, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Beneficial Owner', entityName: 'Company', mandatory: false, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Beneficial Owner', entityName: 'Super Fund', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Controlling Person', entityName: 'Company', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
      { accountType: 'Company', relationshipName: 'Controlling Person', entityName: 'Individual', mandatory: true, chooseFrom: 'Exclude', min: 1, max: 4 },
  ]
};