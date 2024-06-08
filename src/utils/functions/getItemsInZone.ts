import {getItems} from "@/utils/functions/readJsonFiles";

export function getItemsInZone(zone: string, subZone: string) {
    const items = getItems();
    return items[zone][subZone];
}