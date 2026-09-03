const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.clienteId = decoded.id;

        next();
    } catch (erro) {
        res.status(401).json({
            mensagem: 'Token inválido'
        });
    }
}

module.exports = autenticar;