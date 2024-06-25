import {getItemDetails} from "@/utils/functions/getItemDetails";
import {Grid} from "@mui/material";
import styles from './index.module.css'
import ItemsCard from "@/components/items_grid/item_card";

type ArmorPieceProps = {
    item: string
}

export default function ArmorPiece(props: ArmorPieceProps) {
    const {hint, name, type, image, id} = getItemDetails(props.item)

    if (!hint || !name || !type || !image || !id) return

    return (
        <Grid item xs={5} md={2.5} lg={2} className={styles.container}>
            <ItemsCard id={id} name={name} type={type} hint={hint} multiple={false}/>
        </Grid>
    )
}