const bcrypt = require('bcrypt');
const Cliente = require('../models/Cliente');

async function cadastrar(req, res) {
    try {
        const {
            nome,
            email,
            senha,
            telefone,
            modeloVeiculo,
            placa
        } = req.body;

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const cliente = await Cliente.create({
            nome,
            email,
            senha: senhaCriptografada,
            telefone,
            modeloVeiculo,
            placa
        });

        res.status(201).json({
            id: cliente.id,
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            modeloVeiculo: cliente.modeloVeiculo,
            placa: cliente.placa
        });

    } catch (erro) {
        res.status(400).json({
            mensagem: 'Erro ao cadastrar cliente',
            erro: erro.message
        });
    }
}

module.exports = { cadastrar };