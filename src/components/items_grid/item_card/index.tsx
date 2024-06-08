'use client'

import {Card, CardActions, CardContent, Checkbox, FormControlLabel} from "@mui/material";
import Image from "next/image";
import {sanitizeName} from "@/utils/functions/sanitizeName";
import Typography from "@mui/material/Typography";
import {ChangeEvent, useEffect, useState} from "react";
import styles from './index.module.css';


export default function ItemsCard({name, type, hint, multiple, id}: Item) {
    const [acquired, setAcquired] = useState(false);

    useEffect(() => {
        /*TODO determine if acquired*/
    },[]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAcquired(event.target.checked);
    };

    return (
        <Card className={styles.card}>
            <CardContent className={styles.content}>
                <Image src={`/items/${sanitizeName(name)}.webp`} alt={name} width={100} height={100}/>
                <Typography>
                    {name}
                </Typography>
            </CardContent>
            <CardActions className={styles.actions}>
                <FormControlLabel control={<Checkbox onChange={handleChange} checked={acquired} />} label='Acquired' />
            </CardActions>
        </Card>
    );
}
