import {getItems} from "@/utils/functions/readJsonFiles";


export function getZones() {
    const items = getItems();
    return Object.keys(items) ;
}

export function getSubZones(zone) {
    const items = getItems();
    return Object.keys(items[zone]);
}