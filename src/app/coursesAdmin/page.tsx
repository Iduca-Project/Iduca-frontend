"use client";

import { Menu } from "@/src/components/menu";
import { FormControl, InputLabel, MenuItem, Pagination, Select, TextField, ThemeProvider } from "@mui/material";
import { useState } from "react";
import imageLideranca from "../../../public/image/lideranca.jpg";
import { CardCourse } from "@/src/components/cardCourse";
import { CuteButton } from "@/src/components/cuteButton";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/src/constants/routes";


const CATEGORIES = ["tecnologia", "gestao", "seguranca"];
const LEVELS = ["iniciante", "intermediario", "avancado"];

const CoursesAdmin = () => {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [level, setLevel] = useState("");

    return (
        <>

                <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} admin></Menu>
                <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                    {/* Title */}
                    <div className="flex flex-row justify-between items-center p-1 md:items-start">
                        <div className="flex-col gap-1">
                            <h1 className="md:text-2xl text-xl font-bold text-(--text)">Catálogo de Cursos</h1>
                            <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Explore todos os treinamentos disponíveis!</p>
                        </div>
                        <CuteButton 
                            text="Criar novo curso" 
                            icon={AddCircleOutlineOutlinedIcon}
                            onClick={() => router.push(ROUTES.addCourse)}
                        ></CuteButton>
                    </div>

                    {/* Search */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
                        <TextField
                            onChange={(e) => setTitle(e.target.value)}
                            label="Título"
                            variant="outlined"
                            sx={{ backgroundColor: "var(--card)" }}
                            className="md:col-span-2"
                        />
                        <FormControl fullWidth sx={{ backgroundColor: "var(--card)" }}>
                            <InputLabel>Categoria</InputLabel>
                            <Select value={category} label="Categoria" onChange={(e) => setCategory(e.target.value)} >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>
                                {CATEGORIES.map((cat) => (
                                    <MenuItem key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth sx={{ backgroundColor: "var(--card)" }}>
                            <InputLabel>Nível</InputLabel>
                            <Select value={level} label="Nível" onChange={(e) => setLevel(e.target.value)} >
                                <MenuItem value="">
                                    <em>Todos</em>
                                </MenuItem>
                                {LEVELS.map((lvl) => (
                                    <MenuItem key={lvl} value={lvl}>
                                        {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>

                    <div>
                        <div className="flex flex-col gap-10 items-center">
                            <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
                                <CardCourse id={1} image={imageLideranca} title={"Liderança Estratégica"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, velit! Maiores culpa minima quod. Aperiam nam fugiat placeat repudiandae enim fugit rerum veniam vitae voluptate, iure molestias nemo quaerat earum!"} progress={97} rating={4.7} participants={128} difficulty={2}></CardCourse>
                                <CardCourse id={2} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo."} progress={37} rating={4.7} participants={128} difficulty={1}></CardCourse>
                                <CardCourse id={3} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={47} rating={4.7} participants={12} difficulty={2}></CardCourse>
                                <CardCourse id={4} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={68} rating={4.7} participants={1287} difficulty={3}></CardCourse>
                                <CardCourse id={5} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={22} rating={4.7} participants={128} difficulty={1}></CardCourse>
                                <CardCourse id={6} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={80} rating={4.7} participants={128} difficulty={3}></CardCourse>
                                <CardCourse id={7} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={100} rating={4.7} participants={128} difficulty={1}></CardCourse>
                                <CardCourse id={8} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={100} rating={4.7} participants={128} difficulty={1}></CardCourse>
                            </div>
                            <Pagination count={10} color="primary" />
                        </div>
                    </div>
                </div>
        </>
    )
}

export default CoursesAdmin;