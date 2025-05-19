import { Menu } from "@/src/components/menu";

interface IQuiz{
  params: {
    courseId: string;
  };
}


const quiz = async ({ params } : IQuiz) => {
    const { courseId } = params;

    const projectExemple = {
        id: 1,
        title: "Prova Final",
        questions: [
            {
                id: 1,
                question: "What is the command to initialize a Git repository?",
                options: [
                    { id: 1, text: "git start", alternative: "a" },
                    { id: 2, text: "git init", alternative: "b" },
                    { id: 3, text: "git begin", alternative: "c" }
                ]
            },
            {
                id: 2,
                question: "What file tracks your commits?",
                options: [
                    { id: 1, text: ".git/config", alternative: "a" },
                    { id: 2, text: ".gitignore", alternative: "b" },
                    { id: 3, text: ".git", alternative: "c" }
                ]
            }
        ]
    }

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">

            </div>
        </>
    )
}

export default quiz;