import {useSearchParams} from "next/navigation";
import {getItemsInZone} from "@/utils/functions/getItemsInZone";
import {Grid} from "@mui/material";
import ItemsCard from "@/components/items_grid/item_card";
import getAllItems from "@/utils/functions/getAllItems";
import useFilter from "@/hooks/useFilter";
import useSaveData from "@/hooks/useSaveData";

const renderGrid = (items:[string, Item][]) => (
    <Grid container spacing={2} sx={{pt:2}} alignContent={'stretch'}>
        {items.map(([key, value]) => {
            let values = value as Item;
            values = {...values, id: key};
            return (<Grid item key={key} xs={12} sm={6} md={4} lg={2}>
                <ItemsCard {...values}/>
            </Grid>)
        })}
    </Grid>
)

export default function ItemsGrid() {
    const params = useSearchParams();
    const {hideAcquired, howToDrop} = useFilter();
    const {inventory} = useSaveData();
    const zone = params.get('zone');
    const subzone = params.get('subzone');

    let items: {[key: string]: Item} | {} = {};

    if (zone === 'All Items') {
        let _items = getAllItems();
        items = Object.keys(_items).length > 0 ? _items : {};
    } else {
        items = subzone ? getItemsInZone(zone ?? '', subzone ?? '') : {};
    }

    if (hideAcquired) {
        items = Object.fromEntries(Object.entries(items).filter(([key, _]) => !inventory.includes(key)));
    }

    if (howToDrop !== 'all')
        items = Object.fromEntries(Object.entries(items).filter(([_, value]) => value.type === howToDrop));


    const entries: [string, Item][] = Object.entries(items);

    return renderGrid(entries)
}