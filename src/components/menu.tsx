"use client";

import { Button, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { ROUTES } from "../constants/routes";
import { CuteButton } from "./cuteButton";
import { DefaultProfile } from "./defaultProfile";


interface IMenu {
    op1: string,
    op2: string,
    op3: string,
    op4: string,
}

export const Menu = ({op1, op2, op3, op4} : IMenu) => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();

    const toggleDrawer = (newOpen: boolean) => () => {
        setIsOpen(newOpen);
    };

    const getNotify = () => {
        alert("teste")
    }

    const DrawerList = (
        <div onClick={toggleDrawer(false)} className="flex flex-col bg-(--darkBlue) h-screen">
            <h1 className="text-3xl font-semibold m-0 self-center text-(--aquamarine) my-2.5" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
            
            <List sx={{ backgroundColor: "inherit", width: "240px" }}>
                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded hover:bg-(--hoverWhite) px-3 py-1 gap-4 items-center flex">
                            <DashboardOutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.home)} className="text-white font-bold" primary={op1}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton className="w-full" sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded hover:bg-(--hoverWhite) px-3 py-1 gap-4 items-center flex">
                            <LibraryBooksOutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.courses)} className="text-white font-bold" primary={op2}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded hover:bg-(--hoverWhite) px-3 py-1 gap-4 items-center flex">
                            <CalendarMonthOutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.calendar)} className="text-white font-bold" primary={op3}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>

                <ListItem sx={{padding: "0px"}}>
                    <ListItemButton sx={{padding: "8px", paddingX: "10px"}}>
                        <ListItemIcon className="w-full transform transition-all duration-150 rounded hover:bg-(--hoverWhite) px-3 py-1 gap-4 items-center flex">
                            <Person2OutlinedIcon sx={{ color: "white" }}/>
                            <ListItemText onClick={() => router.push(ROUTES.profile)} className="text-white font-bold" primary={op4}/>
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
        );

        return (
        <>
            <div className="bg-(--card) h-14 shadow-(--shadow) items-center flex justify-between px-5">
                <div className="flex items-center gap-3">
                    <Button sx={{ color: "var(--gray)", padding: "0px", width: "30px", minWidth: "0px" }} onClick={toggleDrawer(true)}>
                        <MenuOutlinedIcon sx={{ width: "30px" }}/>
                    </Button>
                    <h1 className="text-2xl font-semibold m-0" style={{ fontFamily: 'var(--jura)'}}>Iduca</h1>
                </div>
                <div className="flex gap-3 items-center">
                    <CuteButton icon={NotificationsNoneOutlinedIcon} onClick={getNotify}></CuteButton>
                    <DefaultProfile firstLetter="S" lastLetter="S" onClick={() => router.push(ROUTES.profile)}></DefaultProfile>
                </div>
            </div>
            <Drawer open={isOpen} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}