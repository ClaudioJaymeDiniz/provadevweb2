import React, { useState, useEffect } from 'react';

const CadastrarCampeonatos: React.FC = () => {
    const [campeonato, setCampeonato] = useState<string>('');
    const [jogoID, setJogoID] = useState<string>('');
    const [jogos, setJogos] = useState<any[]>([]);

    useEffect(() => {
        const fetchJogos = async () => {
            try {
                const response = await fetch('http://localhost:5000/jogos/listar');
                if (response.ok) {
                    const data = await response.json();
                    setJogos(data);
                } else {
                    console.error('Erro ao obter jogos:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao obter jogos:', error);
            }
        };

        fetchJogos();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // enviar os dados para o backend para salvar no banco de dados
        try {
            const response = await fetch('http://localhost:5000/campeonatos/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ campeonato, jogoID }),
            });

            if (response.ok) {
                window.location.reload();
                console.log('Campeonato salvo com sucesso!');
            } else {
                console.error('Erro ao salvar o campeonato:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao salvar o campeonato:', error);
        }
    };

    return (
        <div>
            <p className='title'>Cadastrar Campeonato</p>
            <form onSubmit={handleSubmit}>
                <label className='sub-title' htmlFor="campeonato">Nome do Campeonato:</label>
                <input
                    type="text"
                    id="nome"
                    value={campeonato}
                    onChange={(e) => setCampeonato(e.target.value)}
                    required
                />
                <label className='sub-title' htmlFor="jogoID">Selecione o Jogo:</label>
                <select
                    name="jogoID"
                    id="jogoID"
                    value={jogoID}
                    onChange={(e) => setJogoID(e.target.value)}
                    required
                >
                    <option value="">Selecione um jogo</option>
                    {jogos.map(jogo => (
                        <option key={jogo.jogoID} value={jogo.jogoID}>{jogo.nome}</option>
                    ))}
                </select>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default CadastrarCampeonatos;
