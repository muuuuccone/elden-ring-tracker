'use client'
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useEffect, useState} from "react";
import {getSubZones} from "@/utils/functions/getZones";
import {useRouter, useSearchParams} from "next/navigation";
import ItemsGrid from "@/components/items_grid";
import useSaveData from "@/hooks/useSaveData";
import Typography from "@mui/material/Typography";
import {Check} from "@mui/icons-material";
import styles from './index.module.css';
import FilterTab from "@/components/filter_tab";

export default function ZoneTabs(){
    const {inventory} = useSaveData();
    const [value, setValue] = useState('')
    const router = useRouter();
    const params = useSearchParams();
    const zone = params.get('zone');

    useEffect(() => {
        setValue(params.get('subzone') || '');
    }, [params]);

    const handleChange = (event: SelectChangeEvent) => {
        router.push(`?zone=${params.get('zone')}&subzone=${event.target.value}`);
    };

    let subZones: SubZone[] = []

    if(zone !== 'All Items') subZones = getSubZones(zone);

    subZones = subZones.filter((subZone) => Object.keys(subZone.items).length > 0)

    const completionStatus = (zone: string) => {
        const zoneData = subZones.find((subZone) => subZone.name === zone);
        if(!zoneData) return '';
        const totalItems = Object.keys(zoneData.items).length;
        const collectedItems = Object.keys(zoneData.items).filter((item) => inventory.includes(item)).length;

        return (
            <Box className={styles.completebox}>
                {collectedItems === totalItems && <Check className={styles.check}/>}
            </Box>
        )
    }

    return(
        <Box sx={{minWidth: 400}}>
            {subZones.length > 0 && <FormControl fullWidth>
                <InputLabel>{zone === 'Quests' ? "Select the quest" : "Select the zone"}:</InputLabel>
                <Select
                    label='Select the zone:'
                    labelId='zone-select-label'
                    id='zone-select'
                    value={value}
                    onChange={handleChange}
                >
                    {subZones.map((zone) => (
                        <MenuItem value={zone.name} key={zone.name}>
                            <Box className={styles.menuItem}>
                                {completionStatus(zone.name)}{zone.name}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>}
            <FilterTab/>
            <ItemsGrid/>
        </Box>
    )
}