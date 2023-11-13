import { Router } from "express";
import { salvar, listarTodos, buscarPorNome, buscarPorId, alterar, remover, alterarPoster } from "../repository/filmeRepository.js";

import multer from "multer";
const upload = multer({ dest: './storage'});

const endpoints = Router();

// endpoints para manipular as tabelas

// endpoint para adicionar um filme
endpoints.post('/filme', async (req, resp) => {
    let filme = req.body;

    let r = await salvar(filme);
    resp.send(r);
})

// endpoint para listar todos os filmes
endpoints.get('/filme', async (req, resp) => {
    let r = await listarTodos();
    resp.send(r);
})

// endpoint para buscar filme por nome
endpoints.get('/filme/busca', async (req, resp) => {
    let nome = req.query.nome;
    
    let r = await buscarPorNome(nome);
    resp.send(r);
})

// endpoint para buscar filme por id
endpoints.get('/filme/:id', async (req, resp) => {
    let id = req.params.id;
    
    let r = await buscarPorId(id);
    if (r == null)
        resp.status(404).send();
    else 
        resp.send(r);
})

// endpoint para alterar filme
endpoints.put('/filme/:id', async (req, resp) => {
    let id = req.params.id;
    let filme = req.body;

    let r = await alterar(id, filme);
    if (r == 0)
        resp.status(404).send();
    else 
        resp.status(202).send();
})

// endpoint para deletar filme
endpoints.delete('/filme/:id', async (req, resp) => {
    let id = req.params.id;
    
    let r = await remover(id);
    if (r == 0)
        resp.status(404).send();
    else 
        resp.status(202).send();

})

// endpoint para inserir a imagem do filme
endpoints.put('/filme/:id/poster', upload.single('poster'), async (req, resp) => {
    let id = req.params.id;
    let caminho = req.file.path;

    let r = await alterarPoster(id, caminho);
    if (r == 0)
        resp.status(404).send();
    else 
        resp.status(202).send();
})


export default endpoints;