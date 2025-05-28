"use client";

import { Menu } from "@/src/components/menu";

const Collaborators = () => {

    return (
        <>

                <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} manager></Menu>
                <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                    {/* Title */}
                    <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Colaboradores</h1>
                        <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Acompanhe o desenvolvimento dos seus colaboradores!</p>
                    </div>

                </div>

        </>
    )
}

export default Collaborators;