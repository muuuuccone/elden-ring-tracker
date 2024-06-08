import {useSearchParams} from "next/navigation";
import {getItemsInZone} from "@/utils/functions/getItemsInZone";
import {Grid} from "@mui/material";
import ItemsCard from "@/components/items_grid/item_card";

export default function ItemsGrid() {
    const params = useSearchParams();
    const subzone = params.get('subzone');

    const items: Item[] = subzone ? getItemsInZone(params.get('zone') ?? '', params.get('subzone') ?? '') : [];

    const entries = Object.entries(items);

    return (
        <Grid container spacing={2} sx={{pt:2}} alignContent={'stretch'}>
            {subzone && entries.map(([key, value]) => {
                let values = value as Item;
                values = {...values, id: key};
                return (<Grid item key={key} xs={12} sm={6} md={4} lg={2}>
                    <ItemsCard {...values}/>
                </Grid>)
            })}
        </Grid>
    )
}