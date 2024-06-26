import React, { useState, useEffect } from 'react';

const ListarEquipes: React.FC = () => {
    const [equipes, setEquipes] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [equipeSelecionada, setEquipeSelecionada] = useState<any>({ id: '', nome: '', lider: '', estado: '' });


    useEffect(() => {
        fetchEquipes();
    }, []); // Chamada apenas uma vez ao montar o componente

    const fetchEquipes = async () => {
        try {
            const response = await fetch('http://localhost:5000/equipes/listar');
            if (response.ok) {
                const data = await response.json();
                setEquipes(data);
            } else {
                console.error('Erro ao buscar as equipes:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar as equipes:', error);
        }
    };
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/equipes/deletar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Equipe deletada com sucesso!');
                fetchEquipes(); // Recarrega a lista de jogos após a exclusão
            } else {
                console.error('Erro ao deletar a equipe:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao deletar a equipe:', error);
        }
    };

    const handleUpdate = async (id: string, nome: string, lider: string, estado: string) => {
        try {
            const response = await fetch(`http://localhost:5000/equipes/modificar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nome, lider: lider, estado: estado }), // Enviando o novo nome do jogo no corpo da solicitação
            });

            if (response.ok) {
                fetchEquipes();
                console.log('Equipe atualizada com sucesso!');
            } else {
                console.error('Erro ao atualizar a equipe:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar a equipe:', error);
        }
        setModalOpen(false);
    };

    const openModal = (equipe: any) => {
        setEquipeSelecionada(equipe);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='container'>
            <p className="title">Listar Equipes</p>
            <ul>
                {equipes.map((equipe) => (
                    <li key={equipe.equipeID}>
                        <strong>Nome:  </strong> {equipe.nome}
                        <strong>Lider:  </strong> {equipe.lider}
                        <strong>Estado:  </strong> {equipe.estado}
                        <div className="btn">
                        <button onClick={() => handleDelete(equipe.equipeID)}>Excluir</button>
                        <button onClick={() => openModal(equipe)}>Alterar</button>
                        </div>
                    </li>
                ))}
            </ul>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>Alterar Jogo</h3>
                        <label htmlFor="newName">Novo Nome:</label>
                        <input type="text" id="newName" value={equipeSelecionada.nome} onChange={(e) => setEquipeSelecionada(
                            { ...equipeSelecionada, nome: e.target.value })} />
                        <label htmlFor="newLider">Novo Lider:</label>
                        <input type="text" id="newLider" value={equipeSelecionada.lider} onChange={(e) => setEquipeSelecionada(
                            { ...equipeSelecionada, lider: e.target.value })} />
                        <label htmlFor="newEstado">Novo Estado:</label>
                        <input type="text" id="newEstado" value={equipeSelecionada.estado} onChange={(e) => setEquipeSelecionada(
                            { ...equipeSelecionada, estado: e.target.value })} />
                        <button onClick={() => handleUpdate(
                            equipeSelecionada.equipeID, equipeSelecionada.nome, equipeSelecionada.lider, equipeSelecionada.estado)}>
                            Salvar Alterações</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListarEquipes;

