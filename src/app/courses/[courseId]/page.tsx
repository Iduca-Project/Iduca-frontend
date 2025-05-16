import { Menu } from "@/src/components/menu";
import imagem from "../../../../public/image/lideranca.jpg";
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';


interface ISelectCourse {
  params: {
    courseId: string;
  };
}


const selectCourse = async ({ params } : ISelectCourse) => {
    const { courseId } = params;

    const exempleCourse = {
        image: imagem,
        title: "Liderança estratégica",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt accusamus maxime animi! Ducimus dolore eaque nobis ea optio minus placeat officia saepe voluptatum dolores fugit, explicabo enim illum alias quam. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt accusamus maxime animi! Ducimus dolore eaque nobis ea optio minus placeat officia saepe voluptatum dolores fugit, explicabo enim illum alias quam.",
        progress: 30,
        rating: 4.7,
        participants: 23,
        difficulty: 1,
        duration: 12,
        category: "Gestão",
        id: courseId,
        modules: [
            {
                id: 1,
                title: "Diferenças entre Líder x Chefe",
                description: "bla bla bla líder bla bla bla chefe bla bla bla",
                content: [
                    {
                        id: 1,
                        type: 1,
                        title: "Introdução",
                        completed: true
                    },
                    {
                        id: 2,
                        type: 2,
                        title: "Principais diferenças",
                        completed: true 
                    },
                    {
                        id: 3,
                        type: 3,
                        title: "Questionário sobre o conteúdo",
                        completed: true
                    },
                    {
                        id: 4,
                        type: 4,
                        title: "Projeto",
                        completed: false
                    },
                    {
                        id: 5,
                        type: 5,
                        title: "Prova Final",
                        completed: false
                    }
                ]
            },
            {
                id: 2,
                title: "Como liderar uma equipe com muitos funcionários?",
                description: "bla bla bla líder bla bla bla chefe bla bla bla",
                content: [
                    {
                        id: 1,
                        type: 1,
                        title: "Conteúdo 1",
                        completed: false
                    },
                    {
                        id: 2,
                        type: 2,
                        title: "Conteúdo 2",
                        completed: false  
                    },
                    {
                        id: 3,
                        type: 3,
                        title: "Conteúdo 3",
                        completed: false
                    },
                    {
                        id: 4,
                        type: 4,
                        title: "Conteúdo 4",
                        completed: false
                    },
                    {
                        id: 5,
                        type: 5,
                        title: "Conteúdo 5",
                        completed: false
                    }
                ]
            },
            {
                id: 3,
                title: "Conteúdo fofinho lindo",
                description: "bla bla bla líder bla bla bla chefe bla bla bla",
                content: [
                    {
                        id: 1,
                        type: 1,
                        title: "Conteúdo 1",
                        completed: false
                    },
                    {
                        id: 2,
                        type: 2,
                        title: "Conteúdo 2",
                        completed: false 
                    },
                    {
                        id: 3,
                        type: 3,
                        title: "Conteúdo 3",
                        completed: false
                    },
                    {
                        id: 4,
                        type: 4,
                        title: "Conteúdo 4",
                        completed: false
                    },
                    {
                        id: 5,
                        type: 5,
                        title: "Conteúdo 5",
                        completed: false
                    }
                ]
            },
        ]
    };

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">

                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">Liderança Estratégica</h1>
                    <div className="flex gap-2">
                        <span className={`${exempleCourse.difficulty == 1 ? "bg-(--green)" : exempleCourse.difficulty == 2 ? "bg-(--blue)" : "bg-(--purple)"} text-white text-xs font-semibold px-2 py-1 rounded-lg shadow-lg`}>
                            {exempleCourse.difficulty == 1 ? "Iniciante" : exempleCourse.difficulty == 2 ? "Intermediário" : "Avançado"}
                        </span>
                        <div className="flex items-center gap-1">
                            <AccessTimeOutlinedIcon sx={{ color: "var(--gray)" }}/>
                            <p className="text-(--gray) text-sm text-center md:text-start">{exempleCourse.duration} horas</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <PeopleAltOutlinedIcon sx={{ color: "var(--gray)" }}/>
                            <p className="text-(--gray) text-sm text-center md:text-start">{exempleCourse.participants} participantes</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <StarOutlinedIcon sx={{ color: "var(--yellow)" }}/>
                            <p className="text-(--gray) text-sm text-center md:text-start">{exempleCourse.rating}</p>
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 p-1">
                    <div className="flex flex-col gap-5 justify-around">
                        <p className="text-(--text)">
                            {exempleCourse.description}
                        </p>
                        <div className="flex flex-col gap-2">
                            <div>
                                <div className="flex w-full justify-between">
                                    <h2 className="text-(--text)">Progresso geral</h2>
                                    <h2 className="text-(--text)">{exempleCourse.progress}%</h2>
                                </div>
                                <LinearProgress variant="determinate" value={exempleCourse.progress} />
                            </div>
                            <Link href={`/courses/${courseId}/${exempleCourse.id}`} className="w-3/6 self-start">
                                <div className="bg-(--normalBlue) flex items-center justify-center w-full rounded-2xl hover:bg-(--normalBlueHover) text-white">
                                    <Button className="w-full" disableElevation variant="contained" sx={{boxShadow: 'var(--shadow)', backgroundColor: "inherit", color: "inherit", height: "45px"}}>{exempleCourse.progress > 0 ? "Continuar Curso" : "Iniciar Curso"}</Button>
                                </div>
                            </Link>

                        </div>
                        
                    </div>
                    <Image className="object-cover w-full md:w-auto rounded-2xl justify-self-center" src={exempleCourse.image} alt={`${exempleCourse.title}.png`} width={500} height={500} priority />
                </div>

                <Divider sx={{ borderColor: 'var(--gray)' }} />


                <div>
                    {exempleCourse.modules.map((module, index) => 
                        <Accordion key={module.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <h1 className="text-(--blue) font-bold mr-2">Módulo {index + 1} -</h1>
                                <p className="text-(--text)">{module.title}</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                {module.content.map((content, index) =>
                                    <div key={`${module.id}-${content.id}`}>
                                    {content.completed ? 
                                        <>
                                            {content.type == 1 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--blueOpacity) transition-colors duration-100">
                                                        <div className="bg-(--blue) w-1 min-h-10"></div>
                                                        <FeedOutlinedIcon sx={{ color: "var(--blue)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 2 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--redOpacity) transition-colors duration-100">
                                                        <div className="bg-(--red) w-1 min-h-10"></div>
                                                        <VideocamOutlinedIcon sx={{ color: "var(--red)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 3 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--yellowOpacity) transition-colors duration-100">
                                                        <div className="bg-(--yellow) w-1 min-h-10"></div>
                                                        <FilePresentOutlinedIcon sx={{ color: "var(--yellow)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 4 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--greenOpacity) transition-colors duration-100">
                                                        <div className="bg-(--green) w-1 min-h-10"></div>
                                                        <FeedOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--purpleOpacity) transition-colors duration-100">
                                                        <div className="bg-(--purple) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--purple)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            }
                                        </>
                                    :
                                        <>
                                            {content.type == 1 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--blueOpacity) transition-colors duration-100">
                                                        <div className="bg-(--yellow) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--blue)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 2 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--redOpacity) transition-colors duration-100">
                                                        <div className="bg-(--red) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--red)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 3 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--yellowOpacity) transition-colors duration-100">
                                                        <div className="bg-(--yellow) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--yellow)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : content.type == 4 ? 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--greenOpacity) transition-colors duration-100">
                                                        <div className="bg-(--green) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--green)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            : 
                                                <Link key={`${module.id}-${content.id}`} href={`/courses/${courseId}/${module.id}/${content.id}`}>
                                                    <div className="flex mb-2 mt-2 gap-3 items-center w-full hover:bg-(--purpleOpacity) transition-colors duration-100">
                                                        <div className="bg-(--purple) w-1 min-h-10"></div>
                                                        <ContentPasteOutlinedIcon sx={{ color: "var(--purple)"}}/>
                                                        <h1 className="text-(--text) ">{content.title}</h1>
                                                    </div>
                                                </Link>
                                            }
                                        </>
                                    }
                                    </div>
                                )}
                            </AccordionDetails>
                        </Accordion>
                    )}
                </div>
            </div>
        </>
    )
}

export default selectCourse;