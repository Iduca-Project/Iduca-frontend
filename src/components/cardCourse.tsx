"use client";

import Image, { StaticImageData } from "next/image";
import StarRateIcon from '@mui/icons-material/StarRate';
import LinearProgress from "@mui/material/LinearProgress";
import Link from "next/link";

interface ICardCourse {
    image: string | StaticImageData;
    title: string;
    description: string;
    progress: number;
    rating: number;
    participants: number;
    difficulty: number;
    id: number;
}

export const CardCourse = ({ image, title, description, progress, rating, participants, id } : ICardCourse) => {
    return (
        <Link href={`/courses/${id}`} className="flex items-center justify-center">
            <div className="bg-(--card) border border-(--stroke) transition-all duration-300 ease-in-out transform hover:scale-[1.01] sm:w-full w-10/12 min-h-80 rounded-2xl shadow-(--shadow)">
                <Image className="rounded-t-2xl min-h-36 object-cover w-full" src={image} alt={`${title}.png`} width={500} height={500} priority></Image>
                <div className="p-3 pb-6 flex flex-col gap-3 md:gap-4">
                    <div className="flex lg:flex-row flex-col justify-between">
                        <h1 className="font-bold text-(--text)">{title}</h1>
                        <div className="flex gap-0.5 items-center">
                            <StarRateIcon sx={{ color: "#FACC15" }}/>
                            <p className="text-sm text-(--gray)">{rating.toString()} ({participants.toString()} avaliações)</p>
                        </div>
                    </div>
                    <p className="overflow-hidden text-ellipsis line-clamp-2 text-(--text)">{description}</p>
                    <div>
                        <div className="flex w-full justify-between">
                            <h2 className="text-(--gray)">Progresso</h2>
                            <h2 className="text-(--gray)">{progress.toString()}%</h2>
                        </div>
                        <LinearProgress variant="determinate" value={progress} />
                    </div>
                </div>
            </div>
        </Link>
    )
}