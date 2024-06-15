import useFilter from "@/hooks/useFilter";
import Box from "@mui/material/Box";
import styles from './index.module.css';
import {FormControlLabel, Switch} from "@mui/material";

export default function FilterTab(){
    const {hideAcquired, dispatch, REDUCER_ACTIONS} = useFilter();

    const handleChangeHideAcquired = () => {
        dispatch({type: REDUCER_ACTIONS.TOGGLE_ACQUIRED});
    }

    return(
        <Box className={styles.filterTab}>
            <FormControlLabel control={<Switch checked={hideAcquired} onChange={handleChangeHideAcquired} />} label="Hide acquired" />
        </Box>
    )
}