// funções para executar os comandos do banco de dados
import conexao from "./connection.js";

export async function salvar(filme) {
    let comando = `
        INSERT INTO tb_filme (nm_filme, ds_sinopse, vl_avaliacao, dt_lancamento, bt_disponivel)
                    VALUES (?, ?, ?, ?, ?);
    `

    let resp = await conexao.query(comando, [filme.nome, filme.sinopse, filme.avaliacao, filme.lancamento, filme.assistido])
    let info = resp[0];

    filme.id = info.insertId;
    return filme;
}