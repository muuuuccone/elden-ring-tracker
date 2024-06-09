import {bufferEqual} from "@/utils/functions/bufferEqual";
import {pattern} from "@/utils/constants";


function subfinder(mylist, pattern) {
    for (let i = 0; i < mylist.byteLength; i++) {
        if (mylist[i] === pattern[0] && bufferEqual(mylist.subarray(i, i + pattern.byteLength), pattern)) return i;
    }
}

export function getInventory(slot) {
    const index = subfinder(slot, pattern) + pattern.byteLength + 8;
    const index1 = subfinder(slot.subarray(index, slot.byteLength), new Uint8Array(50).fill(0)) + index + 6;
    return slot.subarray(index, index1);
}