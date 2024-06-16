import useFilter from "@/hooks/useFilter";
import Box from "@mui/material/Box";
import styles from './index.module.css';
import {FormControl, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent, Switch} from "@mui/material";
import {ChangeEvent} from "react";
import {renderIcon} from "@/components/items_grid/item_card";

export default function FilterTab(){
    const {hideAcquired, howToDrop, dispatch, REDUCER_ACTIONS} = useFilter();

    const handleChangeHideAcquired = () => {
        dispatch({type: REDUCER_ACTIONS.TOGGLE_ACQUIRED});
    }

    const handleChangeHowToDrop = (event: SelectChangeEvent) => {
        dispatch({type: REDUCER_ACTIONS.SET_HOW_TO_DROP, payload: event.target.value as string});
    }

    return(
        <Box className={styles.filterTab}>
            <FormControlLabel control={<Switch checked={hideAcquired} onChange={handleChangeHideAcquired} />} label="Hide acquired" />
            <FormControl className={styles.howToSelect}>
                <InputLabel id="how-to-select">How to drop:</InputLabel>
                <Select
                    labelId="how-to-select-label"
                    id="how-to-select"
                    value={howToDrop}
                    label="How to drop:"
                    onChange={handleChangeHowToDrop}
                >
                    <MenuItem value={'all'}>All</MenuItem>
                    <MenuItem value={'foe'}>{renderIcon('foe')}&nbsp;&nbsp;Enemies</MenuItem>
                    <MenuItem value={'chest'}>{renderIcon('chest')}&nbsp;&nbsp;Chest</MenuItem>
                    <MenuItem value={'scarab'}>{renderIcon('scarab')}&nbsp;&nbsp;Scarab</MenuItem>
                    <MenuItem value={'boss'}>{renderIcon('boss')}&nbsp;&nbsp;Boss</MenuItem>
                    <MenuItem value={'merchant'}>{renderIcon('merchant')}&nbsp;&nbsp;Merchant</MenuItem>
                    <MenuItem value={'quest'}>{renderIcon('quest')}&nbsp;&nbsp;Quest</MenuItem>
                    <MenuItem value={'invader'}>{renderIcon('invader')}&nbsp;&nbsp;Invader</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}