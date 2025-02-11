import { BehaviorSubject } from "rxjs";
import { IStaticData } from "../interface/staticData";

export interface IAccountTypesState{
    accountTypes: IStaticData[]
    selectedAccountType: IStaticData | null;
    //..add states here
}