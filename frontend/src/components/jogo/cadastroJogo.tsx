import React, { useState } from 'react';

const CadastrarJogos: React.FC = () => {
    const [nome, setNome] = useState<string>('');


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // enviar os dados para o backend para salvar no banco de dados
        try {
            const response = await fetch('http://localhost:5000/jogos/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome }),
            });

            if (response.ok) {
                window.location.reload();
                console.log('Jogo salvo com sucesso!');
            } else {
                console.error('Erro ao salvar o jogo:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao salvar o jogo:', error);
        }
    };

    return (
        <div>
            <p className='title'>Cadastrar Jogo</p>
            <form onSubmit={handleSubmit}>
                <label className='sub-title' htmlFor="nome">Título do Jogo:</label><br />
                <input
                    type="text"
                    id="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default CadastrarJogos;
