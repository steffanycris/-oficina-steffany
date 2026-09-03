const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/Cliente');

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const cliente = await Cliente.findOne({
            where: { email }
        });

        if (!cliente) {
            return res.status(401).json({
                mensagem: 'Email ou senha inválidos'
            });
        }

        const senhaConfere = await bcrypt.compare(
            senha,
            cliente.senha
        );

        if (!senhaConfere) {
            return res.status(401).json({
                mensagem: 'Email ou senha inválidos'
            });
        }

        const token = jwt.sign(
            { id: cliente.id },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({ token });

    } catch (erro) {
        res.status(500).json({
            mensagem: 'Erro ao fazer login',
            erro: erro.message
        });
    }
}

module.exports = { login };