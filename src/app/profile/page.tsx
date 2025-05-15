"use client";

import { Menu } from "@/src/components/menu";
import Image from "next/image";
import pessoa from "../../../public/image/pessoa.jpg";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { CuteButton } from "@/src/components/cuteButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Card } from "@/src/components/card";
import { useRouter } from 'next/navigation'


const interests = [
    {title: "Programação"},
    {title: "Gestão"},
    {title: "Marketing"},
    {title: "Administração"},
    {title: "Design"},
]


const Profile = () => {
    const router = useRouter();
    
    const goToCertificate = (id : number) => {
        router.push(`/certificate/${id}`)
    }

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">Perfil</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Gerencie suas informações pessoais!</p>
                </div>

                {/* Profile info */}
                <div className="grid xl:grid-cols-[1.1fr_1.5fr] grid-cols-1 w-full gap-6">
                    <div className="bg-(--card)  border border-(--stroke) shadow-(--shadow) rounded-2xl px-6 py-10 flex flex-col gap-20 items-center">
                        <Image className="rounded-full object-cover aspect-square w-52" src={pessoa} alt="imagem" width={3000} height={3000} priority></Image>
                        <div className="flex flex-col gap-6 text-(--text)">
                            <TextField label="Nome completo" variant="outlined" defaultValue={`Sabrina Mortean`} slotProps={{ input: { readOnly: true } }}/>
                            <TextField label="E-mail corporativo" variant="outlined" defaultValue={`sabrina@bosch.com`} slotProps={{ input: { readOnly: true } }} sx={{ color: "inherit" }}/>
                            <Autocomplete
                                multiple
                                readOnly
                                disableClearable
                                options={interests.map((item) => item.title)}
                                defaultValue={interests.map((item) => item.title)}
                                disableCloseOnSelect
                                sx={{ color: "var(--text)" }}
                                renderInput={(params) => (
                                    <TextField {...params} label="Interesses" variant="outlined" sx={{ color: "inherit" }}/>
                                )}
                                renderValue={(selected) => (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                        {selected.map((option, index) => (
                                            <Chip
                                            key={index}
                                            label={option}
                                            sx={{
                                                backgroundColor: 'var(--aquamarine)', 
                                                color: 'white',
                                                fontWeight: 'bold'
                                            }}
                                            />
                                        ))}
                                    </div>
                                )}
                                slotProps={{
                                    popupIndicator: { style: { display: 'none' } }
                                }}
                            />
                        </div>
                        <CuteButton text="Editar Perfil" icon={ArrowForwardIcon}></CuteButton>
                    </div>   

                    {/* Courses */}
                    <div className="flex bg-(--card) flex-col border border-(--stroke) p-5 w-full rounded-2xl gap-4 shadow-(--shadow)">
                        <div className="flex flex-col gap-6">
                            <h1 className="text-xl font-bold text-(--text)">Conquistas</h1>
                            <div className="flex flex-row gap-6 items-center justify-center">
                                <div className="flex bg-(--card) border border-(--stroke) shadow-(--shadow) rounded-2xl p-4 py-8 items-center gap-3 flex-col justify-center w-52">
                                    <div className="flex items-center justify-center p-1 bg-(--greenOpacity) rounded-full">
                                        <EmojiEventsOutlinedIcon sx={{ color: "var(--green)" }}/>
                                    </div>
                                    <h1 className="text-(--gray) text-center">4 cursos finalizados</h1>
                                </div>
                                <div className="flex bg-(--card) border border-(--stroke) shadow-(--shadow) rounded-2xl p-4 py-8 items-center gap-3 flex-col justify-center w-52">
                                    <div className="flex items-center justify-center p-1 bg-(--yellowOpacity) rounded-full">
                                        <StarBorderOutlinedIcon sx={{ color: "var(--yellow)" }}/>
                                    </div>
                                    <h1 className="text-(--gray) text-center">Média nas provas: 8.9</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-xl font-bold text-(--text)">Cursos finalizados</h1>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                <Card color="bg-[var(--purple)]" title="Programação avançada" onClickButton={() => goToCertificate(1)}></Card>
                                <Card color="bg-[var(--purple)]" title="Programação avançada" onClickButton={() => goToCertificate(2)}></Card>
                                <Card color="bg-[var(--purple)]" title="Programação avançada" onClickButton={() => goToCertificate(3)}></Card>
                                <Card color="bg-[var(--purple)]" title="Programação avançada" onClickButton={() => goToCertificate(4)}></Card>
                            </div>
                        </div>
                        
                    </div>    
                </div>
            </div>
        </>
    )
}

export default Profile;

