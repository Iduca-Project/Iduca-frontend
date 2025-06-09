"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  InputAdornment, 
  DialogContent, 
  Box, 
  DialogActions,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { 
  InfoOutlined,
  SearchOutlined,
  ArrowUpward,
  ArrowDownward,
  DownloadOutlined,
  PersonAddAlt1Outlined
} from '@mui/icons-material';
import { Menu } from "@/src/components/menu";
import { CuteButton } from "@/src/components/cuteButton";
import { NotifyModal } from "@/src/components/notifyModal";
import { ROUTES } from "@/src/constants/routes";

interface Collaborator {
  id: number;
  name: string;
  email: string;
  isManager: boolean;
  coursesCompleted: number;
  coursesInProgress: number;
  averageScore: number;
  topCategory: string;
}

const collaboratorsExample: Collaborator[] = [
  {
    id: 1,
    name: "João Silva",
    email: "joao.silva@empresa.com",
    isManager: false,
    coursesCompleted: 12,
    coursesInProgress: 3,
    averageScore: 8.7,
    topCategory: "Desenvolvimento Web"
  },
  {
    id: 2,
    name: "Maria Oliveira",
    email: "maria.oliveira@empresa.com",
    isManager: true,
    coursesCompleted: 8,
    coursesInProgress: 2,
    averageScore: 9.2,
    topCategory: "Data Science"
  },
  // ... outros colaboradores ...
];

const Collaborators = () => {
  const router = useRouter();
  const [sortConfig, setSortConfig] = useState<{ 
    key: keyof Collaborator; 
    direction: 'ascending' | 'descending' 
  } | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [newCollaborator, setNewCollaborator] = useState({
    id: '',
    name: '',
    email: '',
    isManager: false
  });

  // Funções do modal
  const handleOpenModal = () => setOpenModal(true);
  
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewCollaborator({
      id: '',
      name: '',
      email: '',
      isManager: false
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewCollaborator(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!newCollaborator.id || !newCollaborator.name || !newCollaborator.email) {
      alert("Preencha todos os campos obrigatórios");
      return;
    }

    // Aqui você faria a chamada API para cadastrar
    console.log("Novo colaborador:", {
      ...newCollaborator,
      id: Number(newCollaborator.id),
      coursesCompleted: 0,
      coursesInProgress: 0,
      averageScore: 0,
      topCategory: ""
    });

    handleCloseModal();
  };

  // Funções de ordenação
  const requestSort = (key: keyof Collaborator) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Collaborator) => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' 
      ? <ArrowUpward fontSize="small" /> 
      : <ArrowDownward fontSize="small" />;
  };

  // Função de filtro
  const filteredCollaborators = collaboratorsExample.filter(collaborator => {
    const searchLower = searchTerm.toLowerCase();
    return (
      collaborator.name.toLowerCase().includes(searchLower) ||
      collaborator.email.toLowerCase().includes(searchLower) ||
      collaborator.topCategory.toLowerCase().includes(searchLower)
    );
  });

  // Aplicar ordenação
  const sortedCollaborators = [...filteredCollaborators];
  if (sortConfig) {
    sortedCollaborators.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }

  const downloadReport = () => {
    // Implementar lógica de download
    console.log("Exportando relatório...");
  };

  return (
    <>
      <Menu op1="Dashboard" op2="Cursos" op3="Calendário" op4="Perfil" manager />
      
      <div className="flex flex-col md:px-20 lg:px-40 px-2 py-10 gap-8">
        {/* Cabeçalho */}
        <div className="flex flex-row justify-between items-center p-1 md:items-start">
          <div className="flex-col gap-1">
            <h1 className="md:text-2xl text-xl font-bold text-(--text)">Colaboradores</h1>
            <p className="text-(--gray) text-sm md:text-lg text-center md:text-start">
              Acompanhe o desenvolvimento dos seus colaboradores!
            </p>
          </div>
          <div className="flex gap-2">
            <CuteButton 
              text="Cadastrar funcionário" 
              icon={PersonAddAlt1Outlined}
              onClick={handleOpenModal}
            />
            <CuteButton 
              text="Exporte o relatório" 
              icon={DownloadOutlined}
              onClick={downloadReport}
            />
          </div>
        </div>

        {/* Modal de cadastro */}
        <NotifyModal title="Cadastrar Novo Colaborador" open={openModal} onClose={handleCloseModal}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, padding: '20px 0' }}>
              <TextField
                name="id"
                label="ID do Funcionário *"
                variant="outlined"
                fullWidth
                value={newCollaborator.id}
                onChange={handleInputChange}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
              <TextField
                name="name"
                label="Nome Completo *"
                variant="outlined"
                fullWidth
                value={newCollaborator.name}
                onChange={handleInputChange}
              />
              <TextField
                name="email"
                label="Email Corporativo *"
                variant="outlined"
                fullWidth
                value={newCollaborator.email}
                onChange={handleInputChange}
                type="email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="isManager"
                    checked={newCollaborator.isManager}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="É gestor?"
              />
              <small style={{ color: 'gray' }}>* Campos obrigatórios</small>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Cancelar
            </Button>
            <Button 
              onClick={handleSubmit} 
              color="primary"
              variant="contained"
              disabled={!newCollaborator.id || !newCollaborator.name || !newCollaborator.email}
            >
              Cadastrar
            </Button>
          </DialogActions>
        </NotifyModal>

        {/* Barra de pesquisa */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Pesquisar por nome, email ou categoria..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              '& fieldset': {
                borderColor: 'var(--gray)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--primary)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--primary)',
              },
            },
          }}
        />

        {/* Tabela */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {['id', 'name', 'email', 'coursesCompleted', 'coursesInProgress', 'averageScore', 'topCategory'].map((key) => (
                  <TableCell 
                    key={key} 
                    align="center" 
                    onClick={() => requestSort(key as keyof Collaborator)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <div className="flex items-center justify-center gap-1">
                      {{
                        id: 'ID',
                        name: 'Nome',
                        email: 'Email',
                        coursesCompleted: 'Cursos Completos',
                        coursesInProgress: 'Cursos em Andamento',
                        averageScore: 'Score Médio',
                        topCategory: 'Categoria Destaque'
                      }[key]}
                      {getSortIcon(key as keyof Collaborator)}
                    </div>
                  </TableCell>
                ))}
                <TableCell align="center">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedCollaborators.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="hover:bg-(--hoverWhite) transition duration-150" 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="center">{row.id}</TableCell>
                  <TableCell align="center">{row.name}</TableCell>
                  <TableCell align="center">{row.email}</TableCell>
                  <TableCell align="center">{row.coursesCompleted}</TableCell>
                  <TableCell align="center">{row.coursesInProgress}</TableCell>
                  <TableCell align="center">{row.averageScore.toFixed(1)}</TableCell>
                  <TableCell align="center">{row.topCategory}</TableCell>
                  <TableCell align="center">
                    <Button onClick={() => router.push(`/collaborators/${row.id}`)}>
                      <InfoOutlined />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Collaborators;