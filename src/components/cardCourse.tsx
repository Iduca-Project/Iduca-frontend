"use client";

import Image, { StaticImageData } from "next/image";
import StarRateIcon from '@mui/icons-material/StarRate';
import { LinearProgress } from "@mui/joy";

interface ICardCourse {
    image: string | StaticImageData;
    title: string;
    description: string;
    progress: number;
    rating: number;
    participants: number;
    difficulty: number;
}

export const CardCourse = ({ image, title, description, progress, rating, participants } : ICardCourse) => {
    return (
        <div className="bg-(--card) transition-all duration-300 ease-in-out transform hover:scale-[1.01] sm:w-full w-10/12 min-h-80 rounded-2xl shadow-(--shadow)">
            <Image className="rounded-t-2xl min-h-36 object-cover w-full" src={image} alt={`${title}.png`} width={500} height={500} priority></Image>
            <div className="p-3 pb-6 flex flex-col gap-3 md:gap-4">
                <div className="flex lg:flex-row flex-col justify-between">
                    <h1 className="font-bold">{title}</h1>
                    <div className="flex gap-0.5 items-center">
                        <StarRateIcon sx={{ color: "#FACC15" }}/>
                        <p className="text-sm text-(--gray)">{rating.toString()} ({participants.toString()} avaliações)</p>
                    </div>
                </div>
                <p className="overflow-hidden text-ellipsis line-clamp-2">{description}</p>
                <div>
                    <div className="flex w-full justify-between">
                        <h2 className="text-(--gray)">Progresso</h2>
                        <h2 className="text-(--gray)">{progress.toString()}%</h2>
                    </div>
                    <LinearProgress determinate value={progress} />
                </div>
            </div>
        </div>
    )
}