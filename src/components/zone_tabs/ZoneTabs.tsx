'use client'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {SyntheticEvent, useEffect, useState} from "react";
import {getSubZones} from "@/utils/functions/getZones";
import {useRouter, useSearchParams} from "next/navigation";
import ItemsGrid from "@/components/items_grid";

export default function ZoneTabs(){
    const [value, setValue] = useState('')
    const router = useRouter();
    const params = useSearchParams();
    const zone = params.get('zone');
    const subzone = params.get('subzone');

    useEffect(() => {
        setValue(params.get('subzone') || '');
    }, [params]);

    const handleChange = (event: SelectChangeEvent) => {
        router.push(`?zone=${params.get('zone')}&subzone=${event.target.value}`);
    };

    const subZones = zone ? getSubZones(zone) : [];

    return(
        <Box sx={{minWidth: 400}}>
            <FormControl fullWidth>
                <InputLabel>Select the zone:</InputLabel>
                <Select
                    label='Select the zone:'
                    labelId='zone-select-label'
                    id='zone-select'
                    value={value}
                    onChange={handleChange}
                >
                    {subZones.map((zone) => (
                       <MenuItem value={zone} key={zone}>{zone}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <ItemsGrid/>
        </Box>
    )
}