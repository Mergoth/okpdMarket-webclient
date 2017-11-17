import {Injectable} from "@angular/core";
import {BackAPI} from "./back-api.service";
import {ClassificatorItem, Classificator} from "../domain/classificator";

const CACHE = new Map();
const CLSF_TYPES_KEY = 'classificatorTypes';

@Injectable()
export class ClassificatorService {

    constructor(private backApi:BackAPI) {
    }

    classificatorType(code:string):Promise<Classificator> {
        return this.classificatorTypes().then(clsfTypes => clsfTypes.find(item => item.code === code));
    }

    classificatorTypes():Promise<Classificator[]> {
        return CACHE.has(CLSF_TYPES_KEY) ?
            Promise.resolve(CACHE.get(CLSF_TYPES_KEY)) :
            this.backApi.classificatorTypes().then(response => {
                const res = response as Classificator[];
                CACHE.set(CLSF_TYPES_KEY, res);
                return res;
            });
    }

    getList(query:string, type:string):Promise<ClassificatorItem[]> {
        return this.backApi.classificatorsBy(query, type).then(response => response as ClassificatorItem[]);
    }

    classificatorTree(classificator:string, code:string, params:Object):Promise<ClassificatorItem> {
        return code ?
            this.backApi.classificatorItem(classificator, prepareCode(code), params)
            :
            (this.backApi.classificatorTopItems(classificator).then(response => {
                const items = response as ClassificatorItem[];
                items.forEach(item => item.parentCode = classificator);
                return {code: classificator, hasChildren: true, children: items, path: []};
            }));
    }

}

function prepareCode(code:string) {
    return code ? code.replace(/\./g, '') : null;
}
