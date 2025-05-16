import { Menu } from "@/src/components/menu";
import imagem from "../../../../public/image/lideranca.jpg";


interface ISelectCourse {
    params: {
        moduleId: string;
    }
}

const exempleCourse = {
    image: imagem,
    title: "Liderança estratégica",
    description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt accusamus maxime animi! Ducimus dolore eaque nobis ea optio minus placeat officia saepe voluptatum dolores fugit, explicabo enim illum alias quam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt accusamus maxime animi! Ducimus dolore eaque nobis ea optio minus placeat officia saepe voluptatum dolores fugit, explicabo enim illum alias quam.",
    progress: 60,
    rating: 4.7,
    participants: 23,
    difficulty: 1,
    time: 12,
    id: 1,
};


const selectCourse = async ({ params } : ISelectCourse) => {
    const { moduleId } = params;
    
    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>

        </>
    )
}

export default selectCourse;