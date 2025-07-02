"use client";

import { Menu } from "@/src/components/menu";
import { CalendarComp } from "@/src/components/calendar";
import { List, ListItem, CircularProgress, Snackbar, DialogContent, Box, TextField, DialogActions, Button } from "@mui/material";
import { Card } from "@/src/components/card";
import { useState, useEffect } from "react";
import { CuteButton } from "@/src/components/cuteButton";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { NotifyModal } from "@/src/components/notifyModal";
import api from "@/src/constants/api";


// --- INTERFACES PARA OS DADOS ---

interface ICalendarEvent {
    title: any;
    description: any;
    date: any; // A API retorna a data como string ISO
    type: 1 | 2 | 3;
}

const Calendar = () => {
    // --- ESTADOS PARA OS DADOS E UI ---
    const [allEvents, setAllEvents] = useState<ICalendarEvent[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<ICalendarEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- ESTADOS PARA O MODAL DE NOVO LEMBRETE ---
    const [openReminderModal, setOpenReminderModal] = useState(false);
    const [newReminder, setNewReminder] = useState({ title: '', date: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });
    
    // --- LÓGICA DE BUSCA DE DADOS ---
    const fetchCalendarData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Fazemos as duas chamadas em paralelo para mais performance
            const [allEventsRes, nextEventsRes] = await Promise.all([
                api.get('/calendar'),
                api.get('/calendar/next')
            ]);
            
            // Formatamos a data para o componente CalendarComp
            const formattedAllEvents = allEventsRes.data.map((event: any) => ({
                ...event,
                date: new Date(event.date)
            }));
            
            setAllEvents(formattedAllEvents);
            setUpcomingEvents(nextEventsRes.data);

        } catch (err) {
            console.error("Erro ao buscar dados do calendário:", err);
            setError("Não foi possível carregar os eventos.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCalendarData();
    }, []);

    // --- LÓGICA DO MODAL ---
    const handleCreateReminder = async () => {
        if (!newReminder.title.trim() || !newReminder.date) {
            setSnackbar({ open: true, message: "Título e data são obrigatórios." });
            return;
        }
        setIsSubmitting(true);
        try {
            await api.post('/calendar/reminder', newReminder);
            setSnackbar({ open: true, message: "Lembrete criado com sucesso!" });
            setOpenReminderModal(false);
            setNewReminder({ title: '', date: '' });
            fetchCalendarData();
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Erro ao criar lembrete.";
            setSnackbar({ open: true, message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Menu></Menu>
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-row justify-between items-center p-1 md:items-start">
                    <div className="flex-col gap-1">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Calendário de Aulas</h1>
                        <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Veja seus próximos eventos e adicione lembretes!</p>
                    </div>
                    {/* Botão para abrir o modal de novo lembrete */}
                    <CuteButton 
                        text="Criar Lembrete" 
                        icon={AddCircleOutlineOutlinedIcon}
                        onClick={() => setOpenReminderModal(true)}
                    />
                </div>   

                {/* Calendar */}
                {isLoading ? (
                     <div className="flex justify-center items-center h-80"><CircularProgress /></div>
                ) : error ? (
                    <p className="text-red-500 text-center">{error}</p>
                ) : (
                    <CalendarComp events={allEvents} />
                )}

                {/* Next events */}
                <div className="bg-(--card) border border-(--stroke) shadow-(--shadow) rounded-2xl p-5">
                    <h1 className="font-bold text-xl text-(--text)">Próximos 7 Dias</h1>
                    {isLoading ? (
                         <div className="flex justify-center p-4"><CircularProgress size={24} /></div>
                    ) : upcomingEvents.length > 0 ? (
                        <List className="max-h-[300px] overflow-auto pr-2">
                            {upcomingEvents.map((ev, i) => (
                                <ListItem key={i}>
                                <Card
                                    title={ev.description}
                                    description={new Date(ev.date).toLocaleDateString("pt-BR", { weekday: 'long', day: '2-digit', month: 'long' })}
                                    color={
                                        ev.type === 1 ? "bg-[var(--purple)]"
                                        : ev.type === 2 ? "bg-[var(--green)]"
                                        : "bg-[var(--yellow)]"
                                    }
                                    icon
                                />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                         <p className="text-(--gray) p-4">Nenhum evento para os próximos 7 dias.</p>
                    )}
                </div>
            </div>

            {/* Modal para Adicionar Lembrete */}
            <NotifyModal title="Criar Novo Lembrete" open={openReminderModal} onClose={() => setOpenReminderModal(false)}>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, paddingTop: '10px' }}>
                        <TextField
                            label="Título do Lembrete"
                            variant="outlined"
                            fullWidth
                            value={newReminder.title}
                            onChange={(e) => setNewReminder({ ...newReminder, title: e.target.value })}
                        />
                        <TextField
                            label="Data do Lembrete"
                            type="date"
                            fullWidth
                            value={newReminder.date}
                            onChange={(e) => setNewReminder({ ...newReminder, date: e.target.value })}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenReminderModal(false)} disabled={isSubmitting}>Cancelar</Button>
                    <Button onClick={handleCreateReminder} color="primary" variant="contained" disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Salvar Lembrete"}
                    </Button>
                </DialogActions>
            </NotifyModal>
            
            <Snackbar 
                open={snackbar.open} 
                autoHideDuration={5000} 
                onClose={() => setSnackbar({ ...snackbar, open: false })} 
                message={snackbar.message}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            />
        </>
    )
}

export default Calendar;