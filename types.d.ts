type Item = {
    id: string,
    name: string,
    type: string,
    hint: string,
    multiple: boolean,
}

type SubZone = {
    name: string,
    items: Item[]
}