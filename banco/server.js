const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 's2mints2',
  database: 'campeonatos'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem sucedida ao banco de dados MySQL');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
// Rota para criar jogos ----------------------------------------------------------1-
app.post('/jogos/criar', (req, res) => {
  const { nome } = req.body;

  const sql = 'INSERT INTO jogos (nome) VALUES (?)';
  const values = [nome];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir o jogo:', err);
      res.status(500).send('Erro ao salvar o jogo');
      return;
    }
    console.log('Jogo salvo com sucesso:', result.insertId);
    res.status(200).send('Jogo salvo com sucesso');
  });
});

//listar jogos
app.get('/jogos/listar', (req, res) => {
  const sql = 'SELECT * FROM jogos';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar os jogos:', err);
      res.status(500).send('Erro ao listar os jogos');
      return;
    }
    res.json(results);
  });
});
//rota para deletar jogos
app.delete('/jogos/deletar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM jogos WHERE jogoID = ?';

  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar o jogo:', err);
      res.status(500).send('Erro ao deletar o jogo');
      return;
    }
    console.log('Jogo deletado com sucesso:', id);
    res.status(200).send('Jogo deletado com sucesso');
  });
});

// Rota para modificar um jogo pelo ID
app.put('/jogos/modificar/:id', (req, res) => {
  const id = req.params.id;
  const { nome } = req.body;
  const sql = 'UPDATE jogos SET nome = ? WHERE jogoID = ?';
  const values = [nome, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao modificar o jogo:', err);
      res.status(500).send('Erro ao modificar o jogo');
      return;
    }
    console.log('Jogo modificado com sucesso:', id);
    res.status(200).send('Jogo modificado com sucesso');
  });
});
// Equipe --------------------------------------------------------------------2-
app.post('/equipe/criar', (req, res) => {
  const { nome, lider, estado } = req.body;

  const sql = 'INSERT INTO equipes (nome, lider, estado) VALUES (?, ?, ?)';
  const values = [nome, lider, estado];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir a equipe:', err);
      res.status(500).send('Erro ao salvar a equipe');
      return;
    }
    console.log('Equipe salva com sucesso:', result.insertId);
    res.status(200).send('Equipe salva com sucesso');
  });
});


//listar equipes
app.get('/equipes/listar', (req, res) => {
  const sql = 'SELECT * FROM equipes';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar os equipes:', err);
      res.status(500).send('Erro ao listar os equipes');
      return;
    }
    res.json(results);
  });
});
//rota para deletar equipes
app.delete('/equipes/deletar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM equipes WHERE equipeID = ?';

  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar o equipe:', err);
      res.status(500).send('Erro ao deletar o equipe');
      return;
    }
    console.log('Equipe deletada com sucesso:', id);
    res.status(200).send('Equipe deletada com sucesso');
  });
});

// Rota para modificar um equipe pelo ID
app.put('/equipes/modificar/:id', (req, res) => {
  const id = req.params.id;
  const { nome, lider, estado } = req.body;
  const sql = 'UPDATE equipes SET nome = ?, lider = ?, estado = ? WHERE equipeID = ?'; // Query SQL para atualizar os campos
  const values = [nome, lider, estado, id]; // Valores a serem inseridos na query

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao modificar a equipe:', err);
      res.status(500).send('Erro ao modificar a equipe');
      return;
    }
    console.log('Equipe modificada com sucesso:', id);
    res.status(200).send('Equipe modificada com sucesso');
  });
});

//listar participantes --------------------------------------------------------------------------3-
app.get('/participantes/listar', (req, res) => {
  const sql = 'SELECT * FROM participantes';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar os participantes:', err);
      res.status(500).send('Erro ao listar os participantes');
      return;
    }
    res.json(results);
  });
});
//rota para deletar participantes
app.delete('/participantes/deletar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM participantes WHERE participanteID = ?';

  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar o participante:', err);
      res.status(500).send('Erro ao deletar o participante');
      return;
    }
    console.log('Jogo deletado com sucesso:', id);
    res.status(200).send('Jogo deletado com sucesso');
  });
});

// Rota para modificar um jogo pelo ID
app.put('/jogos/modificar/:id', (req, res) => {
  const id = req.params.id;
  const { nome } = req.body;
  const sql = 'UPDATE jogos SET nome = ? WHERE jogoID = ?';
  const values = [nome, id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao modificar o jogo:', err);
      res.status(500).send('Erro ao modificar o jogo');
      return;
    }
    console.log('Jogo modificado com sucesso:', id);
    res.status(200).send('Jogo modificado com sucesso');
  });
});
// campeonato ------------------------------------------------------------------4-
app.post('/campeonatos/criar', (req, res) => {
  const { campeonato, jogoID } = req.body;

  const sql = 'INSERT INTO campeonatos (campeonato, jogoID) VALUES (?, ?)';
  const values = [campeonato, jogoID];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao inserir campeonato:', err);
      res.status(500).send('Erro ao salvar campeonato');
      return;
    }
    console.log('Campeonato salvo com sucesso:', result.insertId);
    res.status(200).send('Campeonato salvo com sucesso');
  });
});

//listar campeonatos
app.get('/campeonatos/listar', (req, res) => {
  const sql = 'SELECT * FROM campeonatos';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erro ao listar os campeonatos:', err);
      res.status(500).send('Erro ao listar os campeonatos');
      return;
    }
    res.json(results);
  });
});
//rota para deletar campeonatos
app.delete('/campeoantos/deletar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM campeonatos WHERE campeonatoID = ?';

  connection.query(sql, id, (err, result) => {
    if (err) {
      console.error('Erro ao deletar o campeonato:', err);
      res.status(500).send('Erro ao deletar o campeonato');
      return;
    }
    console.log('Campeonato deletado com sucesso:', id);
    res.status(200).send('Campeonato deletado com sucesso');
  });
});

// Rota para modificar um campeonato pelo ID
app.put('/campeonatos/modificar/:id', (req, res) => {
  const id = req.params.id;
  const { campeonato, jogo } = req.body;
  const sql = 'UPDATE campeonatos SET campeonato = ?, jogo = ? WHERE campeonatoID = ?'; // Query SQL para atualizar os campos
  const values = [campeonato, jogo, id]; // Valores a serem inseridos na query

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Erro ao modificar campeonato:', err);
      res.status(500).send('Erro ao modificar campeonato');
      return;
    }
    console.log('campeonato modificada com sucesso:', id);
    res.status(200).send('campeonato modificada com sucesso');
  });
});