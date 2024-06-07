function decimalToHex(d: number, padding: number): string {
    let hex = Number(d).toString(16);
    padding = typeof padding === "undefined" || padding === null ? (padding = 2) : padding;

    while (hex.length < padding) {
        hex = "0" + hex;
    }
    return hex;
}

export default function getIdReversed(id: number[]) {
    let final_id = "";
    let tmp = id.slice(0, 4).reverse();
    for (let i = 0; i < 4; i++) {
        final_id += decimalToHex(tmp[i], 2);
    }
    return final_id;
}