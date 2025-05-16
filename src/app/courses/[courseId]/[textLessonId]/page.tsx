import { Menu } from "@/src/components/menu";
import imagem from "../../../../public/image/lideranca.jpg";



const selectCourse = async ({ params } : { params: string }) => {

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>

        </>
    )
}

export default selectCourse;