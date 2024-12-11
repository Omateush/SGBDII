const jwt = require("jsonwebtoken");

module.exports = (requiredRole) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
        }

        try {
            const decoded = jwt.verify(token, "chave_secreta");
            req.user = decoded;

            if (requiredRole && decoded.role !== requiredRole) {
                return res.status(403).json({ error: "Acesso negado. Permissão insuficiente." });
            }

            next();
        } catch (err) {
            res.status(401).json({ error: "Token inválido ou expirado." });
        }
    };
};
