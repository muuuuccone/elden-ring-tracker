async function readJsonFiles() {
    try {
        let res = await fetch("assets/json/data.json");
        const itemsData = await res.json();
        res = await fetch("assets/json/collectibles.json");
        const quantifiableItems = await res.json();
        return { itemsData, quantifiableItems };
    }
    catch (e) {
        console.error(e);
    }
}