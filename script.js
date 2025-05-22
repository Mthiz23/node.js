const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function adicionar (nomeAluno) {
  const idUnico = uuidv4(); 
  const dataHora = new Date().toLocaleString(); 
  const mensagem = `${idUnico} - ${dataHora} - ${nomeAluno}`;

  fs.appendFile('logs.txt', mensagem + '\n', (erro) => {
    if (erro) {
      console.error('Erro ao escrever no arquivo:', erro);
    } else {
      console.log('Mensagem adicionada ao log.');
    }
  });
}
const express = require('express');
const fs = require('fs');
const app = express();
const port = 8000;
app.get('/logs/:id', (req, res) => {
    const logId = req.params.id;
    try {
        const logs = fs.readFileSync('logs.txt', 'utf8');
        const lines = logs.split('\n');
        let logFound = false;
        for (const line of lines) {
            if (line.includes(logId)) {
                res.status(200).json({ message: line });
                logFound = true;
                break;
            }
        }
        if (!logFound) {
            res.status(404).json({ error: 'Log não encontrado' });
        }
    } catch (error) {
        console.error('Erro ao ler o arquivo:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
