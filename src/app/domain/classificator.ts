export interface Classificator {
    code: string;
    name: string;
}

export interface ClassificatorItem extends  Classificator {
    parentCode?: string;
    notes?: string;
    hasChildren?: boolean;
    path?: [string, string][];
    children?: ClassificatorItem[];
    links?: Map<string, ClassificatorItem>;
}