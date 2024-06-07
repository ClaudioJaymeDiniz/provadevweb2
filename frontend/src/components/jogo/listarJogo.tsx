import React, { useState, useEffect } from 'react';

const ListarJogos: React.FC = () => {
    const [jogos, setJogos] = useState<any[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [jogoSelecionado, setJogoSelecionado] = useState<any>({ id: '', nome: '' });

    useEffect(() => {
        fetchJogos();
    }, []); // Chamada apenas uma vez ao montar o componente

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
            const response = await fetch(`http://localhost:5000/jogos/deletar/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Jogo deletado com sucesso!');
                fetchJogos(); // Recarrega a lista de jogos após a exclusão
            } else {
                console.error('Erro ao deletar o jogo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao deletar o jogo:', error);
        }
    };

    const handleUpdate = async (id: string, nome: string) => {
        try {
            const response = await fetch(`http://localhost:5000/jogos/modificar/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome: nome }), // Enviando o novo nome do jogo no corpo da solicitação
            });

            if (response.ok) {
                fetchJogos();
                console.log('Jogo atualizado com sucesso!');
            } else {
                console.error('Erro ao atualizar o jogo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao atualizar o jogo:', error);
        }
        setModalOpen(false);
    };

    const openModal = (jogo: any) => {
        setJogoSelecionado(jogo);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className='container'>
            <p className='title'>Listar Jogos</p>
            <p className='sub-title'>Titulo</p>
            <ul>
                {jogos.map((jogo) => (
                    <li key={jogo.id}>
                        {jogo.nome}
                        <div className="btn">
                        <button onClick={() => handleDelete(jogo.jogoID)}>Excluir</button>
                        <button onClick={() => openModal(jogo)}>Alterar</button>
                        </div>
                    </li>
                ))}
            </ul>
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                    <h3>Alterar Jogo</h3>
                        <span className="close" onClick={closeModal}>&times;</span>
                        <div className="box-modal">
                            
                            <label htmlFor="newName">Novo Nome:</label>
                            <input type="text" id="newName" value={jogoSelecionado.nome} onChange={(e) => 
                                setJogoSelecionado({ ...jogoSelecionado, nome: e.target.value })} 
                            />
                        <button onClick={() => handleUpdate(jogoSelecionado.jogoID, jogoSelecionado.nome)}>Salvar Alterações</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListarJogos;
