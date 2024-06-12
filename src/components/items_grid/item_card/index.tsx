'use client'

import {Box, Card, CardActions, CardContent, Checkbox, FormControlLabel, Popover} from "@mui/material";
import Image from "next/image";
import {sanitizeName} from "@/utils/functions/sanitizeName";
import Typography from "@mui/material/Typography";
import {ChangeEvent, useEffect, useState} from "react";
import styles from './index.module.css';
import useSaveData from "@/hooks/useSaveData";
import sanitizeURL from "@/utils/functions/sanitizeURL";


export default function ItemsCard({name, hint, id}: Item) {
    const {inventory, dispatch} = useSaveData();
    const [acquired, setAcquired] = useState(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    useEffect(() => {
        if (inventory.includes(id)) {
            setAcquired(true);
        }
    }, [inventory]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAcquired(event.target.checked);
        dispatch({type: event.target.checked ? 'ADD' : 'REMOVE', payload: id});
    };

    return (
        <Card className={styles.card}>
            <CardContent className={styles.content}>
                <a target={'_blank'} href={`https://eldenring.wiki.fextralife.com/${sanitizeURL(name)}`}>
                    <Image src={`/items/${sanitizeName(name)}.webp`} alt={name} width={100} height={100}/>
                </a>
                <Typography>
                    {name}
                </Typography>
                <Typography variant='caption' className={styles.hint} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                    location ?
                </Typography>
                <Popover
                    id="mouse-over-popover"
                    sx={{
                        pointerEvents: 'none',
                    }}
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                >
                    <Box className={styles.popover}>
                        <Typography>
                            {hint}
                        </Typography>
                    </Box>
                </Popover>
            </CardContent>
            <CardActions className={styles.actions}>
                <FormControlLabel control={<Checkbox onChange={handleChange} checked={acquired}/>} label='Acquired'/>
            </CardActions>
        </Card>
    );
}
