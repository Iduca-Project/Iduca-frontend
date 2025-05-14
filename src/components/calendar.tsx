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

export interface ICalendar {
  title: string;
  date: Date;
}

interface CalendarProps {
  events: ICalendar[];
}

export const Calendar = ({ events }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const eventosDoDia = events.filter(
    (ev) => selectedDate && isSameDay(ev.date, selectedDate)
  );

  const eventDates = events.map((ev) => ev.date);

  function CustomDay(
    props: PickersDayProps & { events: Date[] }
  ) {
    const { day, events, ...other } = props;
    const hasEvent = events.some((eventDate: Date) =>
      isSameDay(eventDate, day)
    );

    return (
      <div className="relative">
        <PickersDay day={day} {...other} />
        {hasEvent && (
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-purple-500" />
        )}
      </div>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
      <div className="flex lg:flex-row flex-col w-full justify-between gap-3 items-center h-[352px]">
        <div className="bg-[var(--card)] shadow-[var(--shadow)] rounded-2xl p-2 max-w-96">
          <StaticDatePicker
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            displayStaticWrapperAs="desktop"
            slots={{
              day: (props) => <CustomDay {...props} events={eventDates} />,
            }}
            slotProps={{
              actionBar: { actions: [] },
            }}
          />
        </div>
        <div className="bg-[var(--card)] shadow-[var(--shadow)] rounded-2xl w-full p-5 h-[352px]">
          <h1 className="font-bold text-xl">Eventos</h1>
          {eventosDoDia.length > 0 ? (
            <List className="max-h-[290px] overflow-auto pr-2">
              {eventosDoDia.map((ev, i) => (
                <ListItem key={i}>
                  <Card
                    title={ev.title}
                    description={ev.date.toLocaleDateString("pt-BR")}
                    color="(--purple)"
                    icon
                  />
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
