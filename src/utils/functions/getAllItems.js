import {getItems} from "./readJsonFiles";

export default function getAllItems() {
    const items = getItems()
    let allItems = {}
    for (const zone in items) {
        for (const subZone in items[zone]) {
            allItems = {...allItems, ...items[zone][subZone]}
        }
    }

    console.log(allItems)
    return allItems
}