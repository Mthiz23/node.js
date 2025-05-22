const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function adicionarLog(nomeAluno) {
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