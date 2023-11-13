import { Router } from "express";
import { salvar } from "../repository/filmeRepository.js";
const endpoints = Router();

// endpoints para manipular as tabelas
endpoints.post('/filme', async (req, resp) => {
    let filme = req.body;

    let r = await salvar(filme);
    resp.send(r);
})


export default endpoints;