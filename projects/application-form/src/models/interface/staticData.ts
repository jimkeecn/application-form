export interface IStaticData{
    id: number | string;
    name: string;
}

export interface IStaticDataGroup{
    titles: IStaticData[];
    countries: IStaticData[];
    referencesTypes: IStaticData[];
    securityQuestions: IStaticData[];
    communicationsPreferences: IStaticData[];
}


export class StaticDataGroup implements IStaticDataGroup{
    titles: IStaticData[];
    countries: IStaticData[];
    referencesTypes: IStaticData[];
    securityQuestions: IStaticData[];
    communicationsPreferences: IStaticData[];

    constructor() {
        this.titles = [];
        this.countries = [];
        this.referencesTypes = [];
        this.securityQuestions = [];
        this.communicationsPreferences = [];
    }
}


export interface IStaticDataCheck{
    titles: boolean;
    countries: boolean;
    referencesTypes: boolean;
    securityQuestions: boolean;
    communicationsPreferences: boolean;
}

export class StaticDataCheck implements IStaticDataCheck{
    titles: boolean;
    countries: boolean;
    referencesTypes: boolean;
    securityQuestions: boolean;
    communicationsPreferences: boolean;

    constructor() {
        this.titles = false;
        this.countries = false;
        this.referencesTypes = false;
        this.securityQuestions = false;
        this.communicationsPreferences = false;
    }
}
