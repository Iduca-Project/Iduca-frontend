"use client";

import { Menu } from "@/src/components/menu";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import LinearProgress from "@mui/material/LinearProgress";
import { CuteButton } from "@/src/components/cuteButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/navigation';
import { ROUTES } from "@/src/constants/routes";
import { CardCourse } from "@/src/components/cardCourse";
import imageLideranca from "../../../public/image/lideranca.jpg";
import { CalendarComp } from "@/src/components/calendar";
import { useEffect, useState } from "react";
import { Try } from "@mui/icons-material";
import axios from "axios";

interface ICardCourse {
    image: string;
    title: string;
    description: string;
    progress: number;
    rating: number;
    participants: number;
    difficulty: number;
}

interface Course {
    id: string;
    image: string;
    title: string;
    description: string;
    progress: number;
    rating: number;
    participants: number;
    difficulty: number;
}

const Home = () => {
    const [token, setToken] = useState<string | null>(null);
    const [userCourses, setUserCourses] = useState<Course[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem("Token");
        setToken(storedToken);

        const fetchCourses = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5284/api/users/my-courses",
                    {
                        headers: {
                            Authorization: `Bearer ${storedToken}`
                        }
                    }
                );

                const data = Array.isArray(response.data) ? response.data : [];

                setUserCourses(data);
                console.log("Data: ", data);
            } catch (error) {
                console.log(error);
                setUserCourses([]);
            }
        }
    }, []);

    const eventos = [
        { title: "Reunião com o time", date: new Date(2025, 3, 23), type: 1 },
        { title: "Entrega do projeto", date: new Date(2025, 3, 30), type: 2 },
        { title: "Entrega final", date: new Date(2025, 4, 20), type: 3 },
        { title: "Entrega final 2", date: new Date(2025, 4, 20), type: 2 },
        { title: "Entrega final 2", date: new Date(2025, 4, 26), type: 1 },
        { title: "Entrega final 2", date: new Date(2025, 5, 13), type: 2 },
    ];

    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">Bem vindo(a), Sabrina!</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Acompanhe seu progresso e próximos eventos!</p>
                </div>

                {/* Card progress */}
                <div className="flex bg-(--card) border border-(--stroke) flex-col p-5 rounded-2xl gap-4 shadow-(--shadow)">
                    <h1 className="text-xl font-bold text-(--text)">Seu Progresso</h1>
                    <div className="flex flex-col gap-2">
                        <div className="flex w-full justify-between">
                            <h2 className="text-(--text)">Progresso geral</h2>
                            <h2 className="text-(--text)">53%</h2>
                        </div>
                        <LinearProgress variant="determinate" value={53} />
                    </div>
                    <div className="flex justify-between gap-3 md:flex-row flex-col">
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex items-center justify-center p-1 bg-(--blueOpacity) rounded-full">
                                <ClassOutlinedIcon sx={{ color: "var(--blue)" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold text-(--text)">4</h1>
                                <p className="text-(--gray)">Total de cursos</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex items-center justify-center p-1 bg-(--yellowOpacity) rounded-full">
                                <ClassOutlinedIcon sx={{ color: "var(--yellow)" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold text-(--text)">4</h1>
                                <p className="text-(--gray)">Em andamento</p>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex items-center justify-center p-1 bg-(--greenOpacity) rounded-full">
                                <CheckCircleOutlineOutlinedIcon sx={{ color: "var(--green)" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold text-(--text)">4</h1>
                                <p className="text-(--gray)">Completos</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course */}
                <div className="flex flex-col gap-4">
                    <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Cursos em andamento</h1>
                        <CuteButton text="Ver todos" icon={ArrowForwardIcon} onClick={() => router.push(ROUTES.courses)}></CuteButton>
                    </div>
                    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
                        {userCourses.map((row) => (
                            <CardCourse
                                id={row.id}
                                image={row.image}
                                title={row.title}
                                description={row.description}
                                progress={row.progress}
                                rating={row.rating}
                                participants={row.participants}
                                difficulty={row.difficulty}
                            ></CardCourse>
                        ))}
                    </div>
                </div>

                {/* Calendar */}
                <div className="flex flex-col gap-4 mb-10">
                    <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Calendário de aulas</h1>
                        <CuteButton text="Ver todos" icon={ArrowForwardIcon} onClick={() => router.push(ROUTES.calendar)}></CuteButton>
                    </div>
                    <CalendarComp events={eventos}/>
                </div>
            </div>
        </>
    )
}

export default Home;