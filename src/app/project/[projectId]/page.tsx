import { BackButton } from "@/src/components/backButton";
import { Menu } from "@/src/components/menu";
import { PdfUploader } from "@/src/components/pdfUploarder";

interface IProject{
  params: {
    courseId: string;
  };
}


const project = async ({ params } : IProject) => {
    const { courseId } = params;

    const projectExemple = {
        id: 108,
        type: 3,
        title: "Projeto usando github",
        courseId: 5,
        moduleId: 1,
        activityType: 4,
        completed: false,
        description: "Envie um PDF explicando como você inicializou e confirmou seu projeto usando o Git."
    }

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex gap-8 items-center w-full p-1">
                    <BackButton/>
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">{projectExemple.title}</h1>
                </div>

                <PdfUploader pdfId={1}/>

            </div>
        </>
    )
}

export default project;