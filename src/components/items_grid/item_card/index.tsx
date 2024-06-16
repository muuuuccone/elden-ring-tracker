'use client'

import {Box, Card, CardActions, CardContent, Checkbox, FormControlLabel, Popover, Tooltip} from "@mui/material";
import Typography from "@mui/material/Typography";
import {ChangeEvent, useEffect, useState} from "react";
import styles from './index.module.css';
import useSaveData from "@/hooks/useSaveData";
import sanitizeURL from "@/utils/functions/sanitizeURL";
import getWikiImage from "@/utils/functions/getWikiImage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKhanda, faToolbox, faShop, faBug, faScroll, faSkullCrossbones, faGhost} from "@fortawesome/free-solid-svg-icons";
import capitalize from "@mui/utils/capitalize";

export const renderIcon = (type: string) => {
    switch (type) {
        case 'foe':
            return <FontAwesomeIcon icon={faKhanda} />
        case 'chest':
            return <FontAwesomeIcon icon={faToolbox}/>
        case 'scarab':
            return <FontAwesomeIcon icon={faBug}/>
        case 'boss':
            return <FontAwesomeIcon icon={faSkullCrossbones}/>
        case 'merchant':
            return <FontAwesomeIcon icon={faShop}/>
        case 'quest':
            return <FontAwesomeIcon icon={faScroll}/>
        case 'invader':
            return <FontAwesomeIcon icon={faGhost}/>
        default:
            return <></>
    }
}

export default function ItemsCard({name, hint, id, type}: Item) {
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
                    <img src={getWikiImage(name)} alt={name} className={styles.img}/>
                </a>
                <Typography>
                    {name}
                </Typography>
                <Box className={styles.location}>
                    <Tooltip title={type === 'foe' ? 'Enemies' : capitalize(type)}>
                        <Typography>
                            {renderIcon(type)}
                        </Typography>
                    </Tooltip>
                    <Typography variant='caption' className={styles.hint} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose}>
                        hint
                    </Typography>
                </Box>
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
