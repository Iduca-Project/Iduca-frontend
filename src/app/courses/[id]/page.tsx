import { Menu } from "@/src/components/menu";

interface ISelectCourse {
    params: {
        id: string;
    }
}

const selectCourse = async ({ params: { id } } : ISelectCourse) => {
    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
        
        </>
    )
}

export default selectCourse;