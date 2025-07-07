"use client";

import { Menu } from "@/src/components/menu";
import Image, { StaticImageData } from "next/image";
import pessoa from "../../../public/image/pessoa.jpg";
import { Autocomplete, Box, Chip, TextField } from "@mui/material";
import { CuteButton } from "@/src/components/cuteButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import { Card } from "@/src/components/card";
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from "react";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import axios from "axios";


const interests = [
    {title: "Programação"},
    {title: "Gestão"},
    {title: "Marketing"},
    {title: "Administração"},
    {title: "Design"},
]

interface Course {
    id: string;
    name: string;
}

interface IProfileData {
    id: string;
    name: string;
    email: string;
    completedCourses: Course[];
    interests: string[];
    photoUser: string;
}

const Profile = () => {
    const [token, setToken] = useState<string | null>(null);
    const [editOn, setEditOn] = useState(false);
    const [profileData, setProfileData] = useState<IProfileData | null>();
    const router = useRouter();
    const [preview, setPreview] = useState<StaticImageData | string>(pessoa);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("Token");
        setToken(storedToken);

        console.log(token)

        const fetchProfile = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5284/api/profile",
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    }
                );

                // Garantir que completedCourses seja sempre um array
                const data = {
                    ...response.data,
                    completedCourses: Array.isArray(response.data.completedCourses) 
                        ? response.data.completedCourses 
                        : []
                };

                setProfileData(data);
                console.log("Data: ", data);
            } catch (error) {
                console.log(error);
                setProfileData(null);
            }
        }

        if (storedToken) {
            fetchProfile();
        }
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageURL = URL.createObjectURL(file);;
        setPreview(imageURL);
        // Aqui você pode mandar o file pro backend via form ou state
      }
    };
  
    const handleClick = () => {
      fileInputRef.current?.click();
    };
    
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
                            {!editOn ? (
                                <>
                                    <Image className="rounded-full object-cover aspect-square w-52" src={pessoa} alt="imagem" width={3000} height={3000} priority></Image>
                                    <div className="flex flex-col gap-6 text-(--text)">
                                        <TextField label="Nome completo" variant="outlined" value={profileData?.name || ''} slotProps={{ input: { readOnly: true } }}/>
                                        <TextField label="E-mail corporativo" variant="outlined" value={profileData?.email || ''} slotProps={{ input: { readOnly: true } }} sx={{ color: "inherit" }}/>
                                        <Autocomplete
                                            multiple
                                            readOnly
                                            disableClearable
                                            options={interests.map((item) => item.title)}
                                            value={profileData?.interests || []}
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
                                    <CuteButton text="Editar Perfil" onClick={() => setEditOn(true)} icon={ArrowForwardIcon}></CuteButton>

                                </>
                            ) : (
                                <>
                                    <div className="relative w-52 aspect-square cursor-pointer flex items-center justify-center" onClick={handleClick}>
                                        <div className="absolute inset-0 bg-black opacity-50 rounded-full flex items-center justify-center">
                                            <EditOutlinedIcon className="text-white" fontSize="large" />
                                        </div>
                                            
                                            <Image
                                                className="rounded-full object-cover aspect-square"
                                                src={preview}
                                                alt="Foto de perfil"
                                                width={208} height={208}
                                            />

                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                    </div>
                                    <div className="flex flex-col gap-6 text-(--text)">
                                        <TextField label="Nome completo" variant="outlined" value={profileData?.name}/>
                                        <TextField label="E-mail corporativo" variant="outlined" sx={{ color: "inherit" }}/>
                                        <Autocomplete
                                            multiple
                                            disableClearable
                                            options={interests.map((item) => item.title)}
                                            defaultValue={interests.map((item) => item.title)}
                                            disableCloseOnSelect
                                            sx={{ color: "var(--text)", width: "100%" }}
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
                                        />
                                    </div>
                                    <CuteButton text="Editar Perfil" onClick={() => setEditOn(false)} icon={ArrowForwardIcon}></CuteButton>
                                </>
                            )}
                            
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
                                    <h1 className="text-(--gray) text-center">{profileData?.completedCourses.length} Cursos Finalizados</h1>
                                </div>
                                <div className="flex bg-(--card) border border-(--stroke) shadow-(--shadow) rounded-2xl p-4 py-8 items-center gap-3 flex-col justify-center w-52">
                                    <div className="flex items-center justify-center p-1 bg-(--yellowOpacity) rounded-full">
                                        <StarBorderOutlinedIcon sx={{ color: "var(--yellow)" }}/>
                                    </div>
                                    <h1 className="text-(--gray) text-center">Média nas provas:</h1>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <h1 className="text-xl font-bold text-(--text)">Cursos finalizados</h1>
                            <div className="flex flex-col gap-2 items-center justify-center">
                                {profileData?.completedCourses && Array.isArray(profileData.completedCourses) && profileData.completedCourses.length > 0 ? (
                                    profileData.completedCourses.map((row, index) => (
                                        <Card
                                            key={index}
                                            color="bg-[var(--purple)]"
                                            title={row.name}
                                        ></Card>
                                    ))
                                ) : (
                                    <p className="text-(--gray) text-center">Nenhum curso finalizado ainda.</p>
                                )}
                            </div>
                        </div>
                        
                    </div>    
                </div>
            </div>
        </>
    )
}

export default Profile;

