import React, { useState, useEffect } from 'react';

const ListarEquipes: React.FC = () => {
    const [campeonatos, setCampeonatos] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [campeonatoSelecionado, setCampeonatoSelecionado] = useState<any>({ id: '', campeonato: '', jogoID: '', jogoNome: '' });
    const [jogos, setJogos] = useState<any[]>([]);

    useEffect(() => {
        fetchCampeonatos();
        fetchJogos(); // Adicionei a chamada para buscar os jogos
    }, []);

    const fetchCampeonatos = async () => {
        try {
            const response = await fetch('http://localhost:5000/campeonatos/listar');
            if (response.ok) {
                const data = await response.json();
                setCampeonatos(data);
            } else {
                console.error('Erro ao buscar os campeonatos:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar os campeonatos:', error);
        }
    };

    const fetchJogos = async () => {
        try {
            const response = await fetch('http://localhost:5000/jogos/listar');
            if (response.ok) {
                const data = await response.json();
                setJogos(data);
            } else {
                console.error('Erro ao buscar os jogos:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao buscar os jogos:', error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/campeonatos/deletar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Campeonato deletado com sucesso!');
                fetchCampeonatos(); // Recarrega a lista de campeonatos após a exclusão
            } else {
                console.error('Erro ao deletar o campeonato:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao deletar o campeonato:', error);
        }
    };

    const handleUpdate = async (id: string, campeonato: string, jogoID: string) => {
        try {
            const response = await fetch(`http://localhost:5000/campeonatos/modificar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ campeonato, jogoID }),
            });

            if (response.ok) {
                fetchCampeonatos();
                console.log('Campeonato atualizado com sucesso!');
            } else {
                console.error('Erro ao atualizar o campeonato:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar o campeonato:', error);
        }
        setModalOpen(false);
    };

    const openModal = (campeonato: any) => {
        setCampeonatoSelecionado(campeonato);
        const jogo = jogos.find((jogo: any) => jogo.jogoID === campeonato.jogoID);
        setCampeonatoSelecionado({ ...campeonatoSelecionado, jogoNome: jogo?.nome }); // Usando o operador opcional para evitar erros caso o jogo não seja encontrado
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='container'>
            <p className="title">Listar Campeonatos</p>
            <ul>
                {campeonatos.map((campeonato) => (
                    <li key={campeonato.campeonatoID}>
                        <strong>Campeonato: </strong> {campeonato.campeonato}
                        <strong>Jogo: </strong> {campeonato.jogoID}
                        <div className="btn">
                            <button onClick={() => handleDelete(campeonato.campeonatoID)}>Excluir</button>
                            <button onClick={() => openModal(campeonato)}>Alterar</button>
                        </div>
                    </li>
                ))}
            </ul>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>Alterar Jogo</h3>
                        <label htmlFor="newCampeonato">Novo Nome:</label>
                        <input type="text" id="newCampeonato" value={campeonatoSelecionado.campeonato} onChange={(e) => setCampeonatoSelecionado(
                            { ...campeonatoSelecionado, campeonato: e.target.value })} />
                        <label htmlFor="newJogo">Novo Jogo:</label>
                        <input type="text" id="newJogo" value={campeonatoSelecionado.jogoNome} onChange={(e) => setCampeonatoSelecionado(
                            { ...campeonatoSelecionado, jogoNome: e.target.value })} />

                        <button onClick={() => handleUpdate(
                            campeonatoSelecionado.campeonatoID, campeonatoSelecionado.campeonato, campeonatoSelecionado.jogoID)}>
                            Salvar Alterações</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListarEquipes;
