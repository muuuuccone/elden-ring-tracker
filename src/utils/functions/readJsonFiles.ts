import itemsData from "@/data/items.json";
import collectibles from "@/data/collectibles.json";
import master from "@/data/master_item.json";

export function getItems() {
    return itemsData;
}

export function getCollectibles() {
    return collectibles;
}

export function getItemsFromMaster() {
    return master;
}