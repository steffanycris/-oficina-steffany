const express = require('express');
const sequelize = require('./config/database');

require('dotenv').config();

const clienteRoutes = require('./routes/clienteRoutes');
const authRoutes = require('./routes/authRoutes');
const livroRoutes = require('./routes/livroRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');


const app = express();

app.use(express.json());

app.use(clienteRoutes);
app.use(authRoutes);
app.use(livroRoutes);
app.use(movimentacaoRoutes);



sequelize.authenticate()
    .then(() => console.log('Conectado ao banco de dados'))
    .catch(err => console.error('Erro ao conectar:', err));

sequelize.sync();

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});