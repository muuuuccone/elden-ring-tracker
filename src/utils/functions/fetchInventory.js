import {getSlotLs} from './getSlotLs';
import split from "@/utils/functions/split";
import {getInventory} from "@/utils/functions/getInventory";
import getIdReversed from "@/utils/functions/getIdReversed";
export default function fetchInventory(file_read, slot) {
    const saves_array = new Uint8Array(file_read);
    const slots = getSlotLs(saves_array);
    const inventory = Array.from(getInventory(slots[slot]));
    let id_list = split(inventory, 16);
    id_list.forEach((raw_id, index) => (id_list[index] = getIdReversed(raw_id).toUpperCase()));
    return { slots, id_list };
}