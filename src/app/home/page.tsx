"use client";

import { Menu } from "@/src/components/menu";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { LinearProgress } from "@mui/joy";
import { CuteButton } from "@/src/components/cuteButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/src/constants/routes";
import { CardCourse } from "@/src/components/cardCourse";
import imageLideranca from "../../../public/image/lideranca.jpg";
import { Calendar } from "@/src/components/calendar";

interface ICardCourse {
    image: string;
    title: string;
    description: string;
    progress: number;
    rating: number;
    participants: number;
    difficulty: number;
}

const Home = () => {
    const router = useRouter();

    const eventos = [
        { title: "Reunião com o time", date: new Date(2025, 3, 23) },
        { title: "Entrega do projeto", date: new Date(2025, 3, 30) },
        { title: "Entrega final", date: new Date(2025, 1, 20) },
      ];

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold">Bem vindo(a), Sabrina!</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Acompanhe seu progresso e próximos eventos!</p>
                </div>

                {/* Card progress */}
                <div className="flex bg-(--card) flex-col p-5 rounded-2xl gap-4 shadow-(--shadow)">
                    <h1 className="text-xl font-bold">Seu Progresso</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex w-full justify-between">
                            <h2>Progresso geral</h2>
                            <h2>53%</h2>
                        </div>
                        <LinearProgress determinate value={53} />
                    </div>
                    <div className="flex justify-between gap-3 md:flex-row flex-col">
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5">
                            <div className="flex items-center justify-center p-1 bg-(--blueOpacity) rounded-full">
                                <ClassOutlinedIcon sx={{ color: "#007FE6" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold">4</h1>
                                <p className="text-(--gray)">Total de cursos</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5">
                            <div className="flex items-center justify-center p-1 bg-(--yellowOpacity) rounded-full">
                                <ClassOutlinedIcon sx={{ color: "#CA8A04" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold">4</h1>
                                <p className="text-(--gray)">Em andamento</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5">
                            <div className="flex items-center justify-center p-1 bg-(--greenOpacity) rounded-full">
                                <CheckCircleOutlineOutlinedIcon sx={{ color: "#22C55E" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold">4</h1>
                                <p className="text-(--gray)">Completos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course */}
                <div className="flex flex-col gap-4">
                    <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <h1 className="md:text-2xl text-xl font-bold">Cursos em andamento</h1>
                        <CuteButton text="Ver todos" icon={ArrowForwardIcon} onClick={() => router.push(ROUTES.courses)}></CuteButton>
                    </div>
                    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
                        <CardCourse id={1} image={imageLideranca} title={"Liderança Estratégica"} description={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus, velit! Maiores culpa minima quod. Aperiam nam fugiat placeat repudiandae enim fugit rerum veniam vitae voluptate, iure molestias nemo quaerat earum!"} progress={97} rating={4.7} participants={128} difficulty={2}></CardCourse>
                        <CardCourse id={2} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo."} progress={37} rating={4.7} participants={128} difficulty={2}></CardCourse>
                        <CardCourse id={3} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={47} rating={4.7} participants={12} difficulty={2}></CardCourse>
                        <CardCourse id={4} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={68} rating={4.7} participants={1287} difficulty={2}></CardCourse>
                        <CardCourse id={5} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={22} rating={4.7} participants={128} difficulty={2}></CardCourse>
                        <CardCourse id={6} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={80} rating={4.7} participants={128} difficulty={2}></CardCourse>
                        <CardCourse id={7} image={imageLideranca} title={"Liderança Estratégica"} description={"Aprenda técnicas essenciais para se tornar um líder eficaz no ambiente corporativo moderno."} progress={100} rating={4.7} participants={128} difficulty={2}></CardCourse>
                    </div>
                </div>

                {/* Calendar */}
                <div className="flex flex-col gap-4 mb-10">
                    <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <h1 className="md:text-2xl text-xl font-bold">Calendário de aulas</h1>
                        <CuteButton text="Ver todos" icon={ArrowForwardIcon} onClick={() => router.push(ROUTES.calendar)}></CuteButton>
                    </div>
                    <Calendar events={eventos}/>
                </div>
            </div>
        </>
    )
}

export default Home;