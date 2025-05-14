"use client";

import { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { Card } from "./card";

const events = [
  {
    title: "Reunião com o time",
    date: new Date(2025, 3, 23),
  },
  {
    title: "Reunião com o time",
    date: new Date(2025, 3, 23),
  },
  {
    title: "Reunião com o time",
    date: new Date(2025, 3, 23),
  },
  {
    title: "Reunião com o time",
    date: new Date(2025, 3, 23),
  },
  {
    title: "Reunião com o time",
    date: new Date(2025, 3, 23),
  },
  {
    title: "Entrega do projeto",
    date: new Date(2025, 3, 30),
  },
  {
    title: "Entrega do projeto",
    date: new Date(2025, 5, 20),
  },
];

export const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    
    const eventosDoDia = events.filter(
        (ev) =>
            selectedDate &&
        ev.date.toDateString() === selectedDate.toDateString()
    );
    
    return (

    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <div className="flex lg:flex-row flex-col w-full justify-between gap-3 items-center h-[352px]">
        <div className="bg-(--card) shadow-(--shadow) rounded-2xl p-2 max-w-96">
            <DateCalendar
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            />
        </div>
        <div className="bg-(--card) shadow-(--shadow) rounded-2xl w-full p-5 h-[352px]">
          <h1 className="font-bold text-xl">Eventos</h1>
          {eventosDoDia.length > 0 ? (
            <List className="max-h-[290px] overflow-auto">
              {eventosDoDia.map((ev, i) => (
                <ListItem key={i}>
                  {/* <ListItemText primary={ev.title} /> */}
                  <Card title={ev.title} description={new Date(ev.date).toLocaleDateString('pt-BR')} color="(--purple)" icon></Card>
                </ListItem>
              ))}
            </List>
          ) : (
            <h1>Nenhum evento encontrado!</h1>
          )}
        </div>

      
    </div>

    </LocalizationProvider>
  );
};

