import {useSearchParams} from "next/navigation";
import {getItemsInZone} from "@/utils/functions/getItemsInZone";
import {Grid} from "@mui/material";
import ItemsCard from "@/components/items_grid/item_card";
import getAllItems from "@/utils/functions/getAllItems";

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
    const zone = params.get('zone');
    const subzone = params.get('subzone');

    let items: Item[] = []

    if (zone === 'All Items') {
        items = getAllItems() as Item[];
    } else {
        items= subzone ? getItemsInZone(zone ?? '', subzone ?? '') : [];
    }

    const entries = Object.entries(items);

    return renderGrid(entries)
}