import {getItemDetails} from "@/utils/functions/getItemDetails";
import {Box, Grid, Stack} from "@mui/material";
import styles from './index.module.css'
import Typography from "@mui/material/Typography";
import useSaveData from "@/hooks/useSaveData";
import ItemsCard from "@/components/items_grid/item_card";

export default function ArmorPiece({item}) {
    const {hint, name, type, image, id} = getItemDetails(item)

    return (
        <Grid item xs={6} md={2} className={styles.container}>
            <ItemsCard id={id} name={name} type={type} hint={hint} multiple={false}/>
        </Grid>
    )
}