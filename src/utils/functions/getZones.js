import {getItems} from "@/utils/functions/readJsonFiles";


export function getZones() {
    const items = getItems();
    return Object.keys(items) ;
}

export function getSubZones(zone) {
    const items = getItems();
    const subZones = []
    Object.keys(items[zone]).forEach(subZone => {
        subZones.push({
            name: subZone,
            items: items[zone][subZone]
        })
    })
    return subZones;
}