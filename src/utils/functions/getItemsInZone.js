import {getItems} from "@/utils/functions/readJsonFiles";

export function getItemsInZone(zone, subZone) {
    const items = getItems();
    return items[zone][subZone];
}