/** 
 * 1 Criar uma aplicação REST utilizando node js e express com os seguintes endpoints:
 * GET/pessoa => retorne todas as pessoas
 * POST/pessoa => grava uma nova pessoa
 * DELETE/pessoa/(id) => apaga uma pessoa
 * PATCH/pessoa/(id) => atualiza uma pessoa
 * GET/pessoa/(id) => retorna a pessoa com id = (id)
*/

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port = process.env.PORT || 3000;

const database = require('./database.json');

app.get('/pessoa', (req, res)=>{
    
    res.send(database);
});

app.get('/pessoa/:id', (req, res)=>{
     const {id} = req.params;
    const pessoa = database.pessoa.find((person) => person.id === parseInt(id));

    console.log(pessoa);

     if(pessoa)
     {
         res.send({pessoa});
     }
     else
     {
         res.send('<h1> Pessoa não encontrada </h1>');
     }
});

app.post('/pessoa', (req, res)=>{
    const {nome, data_nascimento, email} = req.body;
    
    const id = database.pessoa.length +1;

    const novaPessoa = {
        id,
        nome: nome || '',
        data_nascimento: data_nascimento || '',
        email: email || ''
    }

    database.pessoa.push(novaPessoa);

    console.log(novaPessoa);

    res.send(novaPessoa);//envia a nova pessoa como resposta
});

app.delete('/pessoa/:id', (req, res)=>{
    const {id} = req.params;
    //findIndex -> para iterar pelo array e encontrar o índice da primeira pessoa com o id correspondente ao da requisição
    //parseInt -> para garantir que o id da requisição seja tratado com um número
    const indice = database.pessoa.findIndex((person) => person.id === parseInt(id));
    if(indice !== -1)
    {
        //.splice(x,y) -> ele remove um elemento do array a partir do índice especificado (index) e o número 1 indica que apenas um elemento deve ser removido.
        database.pessoa.splice(indice, 1);
        res.send('Pessoa excluída com sucesso!');
    }
    else
    {
        res.send('Pessoa não encontrada.');
    }
});

app.patch('/pessoa/:id', (req, res)=>{
    const {id} = req.params;
    const {nome, data_nascimento, email} = req.body;
    const pessoa = database.pessoa.find((person) => person.id === parseInt(id));

    if(pessoa)
    {
        //verifica e atualiza apenas os campos fornecidos na requisição
        if(nome !== undefined)
        {
            pessoa.nome = nome;
        }
        if(data_nascimento !== undefined)
        {
            pessoa.data_nascimento = data_nascimento;
        }
        if(email !== undefined)
        {
            pessoa.email = email;
        }
        

        console.log(pessoa);
        res.send(pessoa);
    }
    else
    {
        res.send('Pessoa não encontrada');
    }    
});


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


app.listen(3001, ()=>{
    console.log('Servidor rodando na porta 3001');
});
