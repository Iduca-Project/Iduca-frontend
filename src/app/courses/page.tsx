"use client";

import { Menu } from "@/src/components/menu";
import { TextField } from "@mui/material";
import { useState } from "react";

const Courses = () => {
    const [title, setTitle] = useState("");

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold">Catálogo de Cursos</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Explore todos os treinamentos disponíveis!</p>
                </div>

                {/* Search */}
                <div className="flex w-full">
                    <TextField onChange={ (e) => setTitle(e.target.value) } label="Título" variant="outlined" sx={{ backgroundColor: "var(--card)" }}/>
                    
                </div>
            </div>
        </>
    )
}

export default Courses;