"use client";

import { useState } from "react";
import { List, ListItem } from "@mui/material";
import {
  StaticDatePicker,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { Card } from "./card";
import { isSameDay } from "date-fns";

// A interface ICalendar está perfeita
export interface ICalendar {
  title: string;
  description: string;
  date: Date;
  type: number;
}

interface CalendarProps {
  events: ICalendar[];
}

export const CalendarComp = ({ events }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const eventosDoDia = events.filter(
    (ev) => selectedDate && isSameDay(ev.date, selectedDate)
  );

  const eventTypesByDate = new Map<string, number[]>();

  // Permite múltiplos eventos no mesmo dia
  events.forEach((ev) => {
    const dateKey = ev.date.toDateString();
    if (!eventTypesByDate.has(dateKey)) {
        eventTypesByDate.set(dateKey, []);
    }
    // Adiciona o tipo ao array, evitando duplicatas se não for necessário
    if (!eventTypesByDate.get(dateKey)?.includes(ev.type)) {
        eventTypesByDate.get(dateKey)?.push(ev.type);
    }
  });

  // AQUI ESTÁ A CORREÇÃO: Removemos o <Date> genérico de PickersDayProps
  const CustomDay = ( props: PickersDayProps & { eventTypesByDate: Map<string, number[]> } ) => {
    const { day, eventTypesByDate, ...other } = props;
    const dateKey = day ? day.toDateString() : "";
    const eventTypes = eventTypesByDate.get(dateKey);

    return (
      <div className="relative">
        <PickersDay day={day} {...other} />
        {eventTypes && eventTypes.length > 0 && (
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 flex gap-0.5">
            {eventTypes.slice(0, 3).map((eventType, index) => {
               const colorClass = eventType === 1 ? "bg-[var(--purple)]" // Lembrete
                                : eventType === 2 ? "bg-[var(--yellow)]" // Atividade
                                : "bg-[var(--red)]";      // Prova
               return <div key={`${dateKey}-${eventType}`} className={`w-1.5 h-1.5 rounded-full ${colorClass}`} />;
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <div className="flex lg:flex-row flex-col w-full justify-between gap-3 items-start">
        <div className="bg-(--card) border border-(--stroke) shadow-[var(--shadow)] rounded-2xl p-2 max-w-96 w-full">
          <StaticDatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            displayStaticWrapperAs="desktop"
            slots={{ day: (props) => <CustomDay {...props} eventTypesByDate={eventTypesByDate} /> }}
            slotProps={{
              actionBar: { actions: [] },
              nextIconButton: { sx: { color: "var(--text)" } },
              previousIconButton: { sx: { color: "var(--text)" } },
              switchViewIcon: { sx: { fill: "var(--text)" } }
            }}
            sx={{
              backgroundColor: 'var(--card)', borderRadius: '12px',
              '.MuiPickersCalendarHeader-root': { color: 'var(--text)' },
              '.MuiDayCalendar-weekDayLabel': { color: 'var(--text)' },
              '.MuiPickersDay-root': { color: 'var(--text)' },
              '.Mui-selected': { backgroundColor: 'var(--purple) !important', color: 'white !important' },
              '.MuiPickersDay-root:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
              '.MuiYearCalendar-root .Mui-selected, .MuiMonthCalendar-root .Mui-selected': { backgroundColor: 'var(--purple) !important', color: 'white !important' },
            }}
          />
        </div>
        <div className="bg-(--card) border border-(--stroke) shadow-[var(--shadow)] rounded-2xl w-full p-5 min-h-[400px]">
          <h1 className="font-bold text-xl text-(--text) mb-4">Eventos para {selectedDate ? selectedDate.toLocaleDateString('pt-BR', {day: '2-digit', month: 'long'}) : 'o dia selecionado'}</h1>
          {eventosDoDia.length > 0 ? (
            <List className="max-h-[290px] overflow-auto pr-2">
              {eventosDoDia.map((ev, i) => (
                <ListItem key={i} sx={{ px: 0 }}>
                  <Card
                    title={ev.description}
                    description={new Date(ev.date).toLocaleTimeString("pt-BR", { hour: '2-digit', minute: '2-digit' })}
                    color={
                      ev.type === 1 ? "bg-[var(--purple)]"
                      : ev.type === 2 ? "bg-[var(--yellow)]"
                      : "bg-[var(--red)]"
                    }
                    icon
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <div className="flex items-center justify-center h-full">
                <h1 className="text-(--gray)">Nenhum evento para este dia!</h1>
            </div>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};