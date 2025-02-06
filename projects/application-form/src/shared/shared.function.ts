
import { environment } from "../environments/environment.development";
import { FieldType, FullFormObject, ValidationType } from "../models/interface/field_config";
export function consoleLog(log: any,fn?: any ) {
    if (!environment.production) {
        console.log(log);
    }
}

export function convertToFullFormObject(json: Record<string, any>): Record<string, FullFormObject> {
    return Object.keys(json).reduce((acc, key) => {
        const field = json[key];

        acc[key] = {
            isEnabled: field?.isEnabled ?? false, 
            fieldType: Object.values(FieldType).includes(field?.fieldType) 
                ? field.fieldType as FieldType 
                : FieldType.text, 
            label: field?.label ?? '', 
            helper: field?.helper ?? '', 
            placeholder: field?.placeholder ?? '', 
            validation: Array.isArray(field?.validation) 
                ? field.validation.map((v: string) => v as ValidationType) 
                : [], 
        };

        return acc;
    }, {} as Record<string, FullFormObject>);
}
