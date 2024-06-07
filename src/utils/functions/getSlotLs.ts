export function getSlotLs(dat: Uint8Array) {
    const slot1 = dat.subarray(0x00000310, 0x0028030f + 1);
    const slot2 = dat.subarray(0x00280320, 0x050031f + 1);
    const slot3 = dat.subarray(0x500330, 0x78032f + 1);
    const slot4 = dat.subarray(0x780340, 0xa0033f + 1);
    const slot5 = dat.subarray(0xa00350, 0xc8034f + 1);
    const slot6 = dat.subarray(0xc80360, 0xf0035f + 1);
    const slot7 = dat.subarray(0xf00370, 0x118036f + 1);
    const slot8 = dat.subarray(0x1180380, 0x140037f + 1);
    const slot9 = dat.subarray(0x1400390, 0x168038f + 1);
    const slot10 = dat.subarray(0x16803a0, 0x190039f + 1);
    return [slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8, slot9, slot10];
}