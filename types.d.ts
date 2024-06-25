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

type ArmorSet = {
    image: string,
    items: string[],
    link: string,
    name: string,
}