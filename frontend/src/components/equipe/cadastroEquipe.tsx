import React, { useState } from 'react';

const CadastrarEquipes: React.FC = () => {
    const [nome, setNome] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // enviar os dados para o backend para salvar no banco de dados
        try {
            const response = await fetch('http://localhost:5000/equipe/criar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nome }),
            });

            if (response.ok) {
                window.location.reload();
                console.log('Equipe salva com sucesso!');
            } else {
                console.error('Erro ao salvar a equipe:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao salvar a equipe:', error);
        }
    };

    return (
        <div>
            <p className='title'>Cadastrar Equipe</p>
            <form onSubmit={handleSubmit}>
                <label className='sub-title' htmlFor="nome">Nome da equipe:</label>
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

export default CadastrarEquipes;
