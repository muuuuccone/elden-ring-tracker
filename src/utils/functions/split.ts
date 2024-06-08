export default function split(list_a, chunk_size) {
    const splitted = [];
    for (let i = 0; i < list_a.length; i += chunk_size) {
        let chunk = list_a.slice(i, i + chunk_size);
        splitted.push(chunk);
    }
    return splitted;
}