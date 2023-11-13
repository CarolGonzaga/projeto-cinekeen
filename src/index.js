import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';

import filmeController from './controller/filmeController.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(filmeController);

servidor.use('/storage', express.static('./storage'))

servidor.listen(
    process.env.PORT, 
    () => console.log(`API subiu na porta ${process.env.PORT}`));