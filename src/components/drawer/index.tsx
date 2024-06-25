'use client'

import {ReactNode, useState} from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './index.module.css';
import {getZones} from "@/utils/functions/getZones";
import {useRouter, useSearchParams} from "next/navigation";
import {Button} from "@mui/material";
import SaveDialog from "@/components/save_dialog";
import {SaveDataContextProvider} from "@/context/SaveDataContext";
import Image from "next/image";
import {FilterContextProvider} from "@/context/FilterContext";
import Link from "next/link";

const drawerWidth = 240;

type DrawerProps = {
    children: ReactNode | ReactNode[]
}

export default function ResponsiveDrawer({children}: DrawerProps) {
    const router = useRouter();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const params = useSearchParams();
    const zone = params.get('zone');

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }

    const zones = getZones();

    const setParams = (param: string) => {
        router.push(`?zone=${param}`);
    }

    const drawer = (
        <div className={styles.drawer}>
            <Box>
                <Toolbar>
                    <Box>
                        <Image src={'/images/logo.png'} alt={'logo'} objectFit={'contain'} fill/>
                    </Box>
                </Toolbar>
                <Divider/>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setParams('All Items')}>
                            All Items
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton href={'/armor'}>
                            Armor sets
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider/>
                <List>
                    {zones && zones.map((text) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton onClick={() => setParams(text)}>
                                <ListItemText primary={text}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box className={styles.load} onClick={handleModalOpen}>
                <Divider/>
                <Button variant={'contained'}>
                    Load save data
                </Button>
            </Box>
        </div>
    );

    return (
        <SaveDataContextProvider>
            <FilterContextProvider>
                <Box sx={{display: 'flex'}}>
                    <SaveDialog modalOpen={modalOpen} handleModalOpen={handleModalOpen}/>
                    <AppBar
                        position="fixed"
                        sx={{
                            width: {sm: `calc(100% - ${drawerWidth}px)`},
                            ml: {sm: `${drawerWidth}px`},
                        }}
                    >
                        <Toolbar className={styles.appBar}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{mr: 2, display: {sm: 'none'}}}
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" noWrap component="div">
                                {zone ? zone : 'Elden Ring Tracker'}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Box
                        component="nav"
                        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                        aria-label="mailbox folders"
                    >
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onTransitionEnd={handleDrawerTransitionEnd}
                            onClose={handleDrawerClose}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: {xs: 'block', sm: 'none'},
                                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                            }}
                        >
                            {drawer}
                        </Drawer>
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: {xs: 'none', sm: 'block'},
                                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                    <Box className={styles.children} sx={{width: `calc(100% - ${drawerWidth}px)`}}>
                        {children}
                    </Box>
                </Box>
            </FilterContextProvider>
        </SaveDataContextProvider>
    )
}