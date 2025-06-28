"use client";

import { Menu } from "@/src/components/menu";
import { CuteButton } from "@/src/components/cuteButton";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import BusinessIcon from '@mui/icons-material/Business';
import { CardCompany } from "@/src/components/cardCompany";
import { useState, useEffect } from 'react';
import { NotifyModal } from "@/src/components/notifyModal";
import { TextField, Button, DialogActions, DialogContent, Box, Checkbox, FormControlLabel, CircularProgress, Snackbar } from '@mui/material';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import api from "@/src/constants/api";


// --- INTERFACES PARA OS DADOS ---

interface ICompany {
  id: string; // ID do MongoDB é string
  name: string;
}

const HomeAdmin = () => {
    // --- ESTADOS PARA OS DADOS E UI ---
    const [companies, setCompanies] = useState<ICompany[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // --- ESTADOS PARA OS MODAIS ---
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: "" });
    
    // Modal de Adicionar Empresa
    const [openAddCompanyModal, setOpenAddCompanyModal] = useState(false);
    const [newCompanyName, setNewCompanyName] = useState('');

    // Modal de Adicionar Gestor
    const [openAddManagerModal, setOpenAddManagerModal] = useState(false);
    const [newManager, setNewManager] = useState({ employeeId: '', name: '', email: '' });
    const [newlyCreatedCompanyId, setNewlyCreatedCompanyId] = useState<string | null>(null);

    // --- LÓGICA DE BUSCA DE DADOS ---
    const fetchCompanies = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.get('/admin/companies');
            setCompanies(response.data.companies);
        } catch (err) {
            console.error("Erro ao buscar empresas:", err);
            setError("Não foi possível carregar as empresas.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCompanies();
    }, []); // Roda apenas uma vez ao carregar

    // --- LÓGICA DOS MODAIS ---

    // Adicionar Empresa
    const handleAddCompany = async () => {
        if (!newCompanyName.trim()) {
            setSnackbar({ open: true, message: 'O nome da empresa é obrigatório.' });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await api.post('/admin/companies', { name: newCompanyName.trim() });
            setNewlyCreatedCompanyId(response.data.companyId); // Salva o ID da nova empresa
            
            setSnackbar({ open: true, message: "Empresa criada! Agora, cadastre o gestor." });
            setOpenAddCompanyModal(false); // Fecha o modal de empresa
            setOpenAddManagerModal(true);  // Abre o modal de gestor
            fetchCompanies(); // Atualiza a lista de empresas em segundo plano
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Erro ao adicionar empresa.';
            setSnackbar({ open: true, message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Adicionar Gestor
    const handleAddManager = async () => {
        if (!newManager.employeeId || !newManager.name || !newManager.email) {
            setSnackbar({ open: true, message: "Preencha todos os campos do gestor." });
            return;
        }
        setIsSubmitting(true);
        try {
            // Chama o endpoint de criar usuário, que já tem a lógica para admin
            await api.post('/users', {
                ...newManager,
                isManager: true, // Admin sempre cria um manager
                companyId: newlyCreatedCompanyId
            });
            setSnackbar({ open: true, message: "Gestor cadastrado com sucesso!" });
            setOpenAddManagerModal(false); // Fecha o modal
            // Limpa os formulários
            setNewCompanyName('');
            setNewManager({ employeeId: '', name: '', email: ''});
            setNewlyCreatedCompanyId(null);
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Erro ao cadastrar gestor.';
            setSnackbar({ open: true, message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Menu />
            <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
                {/* Title */}
                <div className="flex flex-col gap-1 items-center p-1 md:items-start">
                    <h1 className="md:text-2xl text-xl font-bold text-(--text)">Bem vindo(a), Admin!</h1>
                    <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">Gerencie as empresas cadastradas no sistema</p>
                </div>

                {/* Stats Card */}
                <div className="flex bg-(--card) border border-(--stroke) flex-col p-5 rounded-2xl gap-4 shadow-(--shadow)">
                    <h1 className="text-xl font-bold text-(--text)">Visão Geral</h1>
                    <div className="flex justify-between gap-3 md:flex-row flex-col">
                        <div className="flex gap-4 items-center bg-(--lightGray) rounded w-full px-3 py-1.5 border border-(--stroke)">
                            <div className="flex items-center justify-center p-1 bg-(--blueOpacity) rounded-full">
                                <BusinessIcon sx={{ color: "var(--blue)" }}/>
                            </div>
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-bold text-(--text)">{companies.length}</h1>
                                <p className="text-(--gray)">Empresas cadastradas</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Companies List */}
                <div className="flex flex-col gap-4">
                    <div className="flex sm:flex-row flex-col gap-2 justify-between items-center">
                        <h1 className="md:text-2xl text-xl font-bold text-(--text)">Empresas</h1>
                        <CuteButton text="Adicionar empresa" icon={ArrowForwardIcon} onClick={() => setOpenAddCompanyModal(true)} />
                    </div>
                    {isLoading ? (
                        <div className="flex justify-center p-10"><CircularProgress /></div>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-6 gap-4">
                            {companies.map((company) => (
                                <CardCompany key={company.id} id={company.id} name={company.name} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal para adicionar nova empresa */}
            <NotifyModal title="Adicionar Nova Empresa" open={openAddCompanyModal} onClose={() => setOpenAddCompanyModal(false)}>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
                        <TextField
                            label="Nome da Empresa"
                            variant="outlined"
                            fullWidth
                            value={newCompanyName}
                            onChange={(e) => setNewCompanyName(e.target.value)}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddCompanyModal(false)} disabled={isSubmitting}>Cancelar</Button>
                    <Button onClick={handleAddCompany} color="primary" variant="contained" disabled={!newCompanyName.trim() || isSubmitting}>
                        {isSubmitting ? 'Adicionando...' : 'Próximo'}
                    </Button>
                </DialogActions>
            </NotifyModal>

            {/* Modal para cadastrar o gestor */}
            <NotifyModal title="Cadastrar Gestor da Empresa" open={openAddManagerModal} onClose={() => setOpenAddManagerModal(false)}>
                <DialogContent>
                    <p className='text-(--gray) mb-4'>Agora cadastre o gestor principal para a empresa "{newCompanyName}".</p>
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField name="employeeId" label="ID do Funcionário *" variant="outlined" fullWidth value={newManager.employeeId} onChange={(e) => setNewManager({...newManager, employeeId: e.target.value})} />
                        <TextField name="name" label="Nome Completo *" variant="outlined" fullWidth value={newManager.name} onChange={(e) => setNewManager({...newManager, name: e.target.value})} />
                        <TextField name="email" label="Email Corporativo *" variant="outlined" fullWidth value={newManager.email} onChange={(e) => setNewManager({...newManager, email: e.target.value})} type="email" />
                        <small style={{ color: 'gray' }}>* Campos obrigatórios</small>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddManagerModal(false)} disabled={isSubmitting}>Cancelar</Button>
                    <Button onClick={handleAddManager} color="primary" variant="contained" disabled={isSubmitting || !newManager.employeeId || !newManager.name || !newManager.email}>
                        {isSubmitting ? 'Cadastrando...' : 'Cadastrar Gestor'}
                    </Button>
                </DialogActions>
            </NotifyModal>
            
            <Snackbar open={snackbar.open} autoHideDuration={5000} onClose={() => setSnackbar({...snackbar, open: false})} message={snackbar.message} />
        </>
    )
}

export default HomeAdmin;