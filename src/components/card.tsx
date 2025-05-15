"use client";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface ICard {
    title: string;
    description?: string;
    color: string;
    onClickCard?: () => void;
    onClickButton?: () => void;
    icon?: boolean
}

export const Card = ({ title, description, onClickCard, onClickButton, color, icon }: ICard) => {
    return (
        <div className="flex items-center bg-(--card) border-t border-r border-b border-(--stroke) shadow-(--shadow) h-20 rounded-2xl w-full justify-between">
            <div className={`${color} w-3 h-20 rounded-l-2xl`}></div>
            <div className="p-4 flex-1">
                <h3 className="text-md md:text-lg font-semibold text-(--text)">{title}</h3>
                <div className="flex items-center gap-1">
                    {icon && <CalendarMonthIcon sx={{ color: "var(--gray)" }}/>}
                    {description && <p className="text-sm text-(--gray)">{description}</p>}
                </div>
            </div>
        </div>
    );
}
