import { Menu } from "@/src/components/menu";
import { LinearProgress } from "@mui/material";
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const Home = () => {
    return (
        <>
            <Menu op1={"Dashboard"} op2={"Cursos"} op3={"Calendário"} op4={"Perfil"} ></Menu>
            <div className="flex flex-col md:px-18 px-2 py-10 gap-8">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold">Bem vindo(a), Sabrina!</h1>
                    <p className="text-(--gray)">Acompanhe seu progresso e próximos eventos!</p>
                </div>
                <div className="flex bg-(--card) flex-col p-3 rounded-2xl shadow-(--shadow)">
                    <h1 className="text-xl font-bold">Seu Progresso</h1>
                    <div>
                        <div className="flex w-full justify-between">
                            <h2>Progresso geral</h2>
                            <h2>53%</h2>
                        </div>
                        <LinearProgress variant="buffer" value={50} />
                    </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <ClassOutlinedIcon />
                            <div>
                                <h1>4</h1>
                                <p>Total de cursos</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <ClassOutlinedIcon />
                            <div>
                                <h1>4</h1>
                                <p>Em andamento</p>
                            </div>
                        </div>
                        <div className="flex gap-2 items-center">
                            <CheckCircleOutlineOutlinedIcon/>
                            <div>
                                <h1>4</h1>
                                <p>Completos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;