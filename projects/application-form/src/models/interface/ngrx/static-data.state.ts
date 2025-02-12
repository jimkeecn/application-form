import { IStaticDataGroup, StaticDataGroup } from "../staticData";

export interface StaticDataState {
    staticData: IStaticDataGroup;
}

export const initialStaticDataState: StaticDataState = {
    staticData: new StaticDataGroup()
}