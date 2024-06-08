export default function findItemQuantities(slot: any, quantifiableItems:any) {
    const result = new Array(quantifiableItems.length).fill(0);
    for (let i = 0; i < slot.byteLength - 4; i++) {
        for (let j = 0; j < quantifiableItems.length; j++) {
            const item = quantifiableItems[j];
            if (slot[i] === item.id[0] && slot[i + 1] === item.id[1] && slot[i + 2] === 0 && slot[i + 3] === 176) {
                result[j] = slot[i + 4];
            }
        }
    }
    return result;
}

