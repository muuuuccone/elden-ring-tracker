import {getItemsFromMaster} from "./readJsonFiles";

function getItemFromMaster(id) {
    const master = getItemsFromMaster();
    return master.find((item) => item.id === id);
}

export function getItemDetails(id) {
    const item = getItemFromMaster(id);
    return {
        id,
        name: item ? item.name : null,
        hint: item ? item.hint : null,
        image: item ? item.image : null,
        type: item ? item.type : null,
    };
}