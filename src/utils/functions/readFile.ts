import {bufferEqual} from "@/utils/functions/bufferEqual";

export function readFile(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const file_read = e.target?.result as ArrayBuffer;
            if (!bufferEqual(file_read["slice"](0, 4), new Int8Array([66, 78, 68, 52]))) {
                alert("Insert a valid file");
                reject();
                return;
            }
            resolve(reader.result as ArrayBuffer);
        };
        reader.onerror = () => {
            reject(reader.error);
        };
        reader.readAsArrayBuffer(file);
    });
}