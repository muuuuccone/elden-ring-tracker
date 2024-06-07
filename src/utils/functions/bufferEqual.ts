export function bufferEqual(buf1: ArrayBuffer, buf2: Int8Array): boolean {
    if (buf1.byteLength !== buf2.byteLength) return false;
    const dv1 = new Int8Array(buf1);
    const dv2 = new Int8Array(buf2);
    for (let i = 0; i !== buf1.byteLength; i++) {
        if (dv1[i] !== dv2[i]) return false;
    }
    return true;
}