import { IStaticData, IStaticDataGroup } from "../interface/staticData";

export interface StaticDataState {
    staticData: IStaticDataGroup;
    products: IStaticData[];
    accountTypes: IStaticData[];
}