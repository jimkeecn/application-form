import { BehaviorSubject } from "rxjs";
import { IStaticData } from "../interface/staticData";

export interface IProductState{
    products: IStaticData[]
    selectedProductName: IStaticData | null;
    //..add states here
}