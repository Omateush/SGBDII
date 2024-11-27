const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Modelo do usuário
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Configuração da chave secreta para JWT (ideal usar variáveis de ambiente)
const JWT_SECRET = "chave_secreta"; // Substitua por uma chave mais segura

router.post("/register", async (req, res) => {
    try {
        const { username, password, role } = req.body;

        console.log("Senha original enviada:", password);

        // Criptografar a senha
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Senha criptografada gerada:", hashedPassword);

        const newUser = new User({
            username,
            password: hashedPassword,
            role,
        });

        await newUser.save();
        res.status(201).json({ message: "Usuário registrado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        console.log(`Tentativa de login para: ${username}`);
        console.log(`Senha enviada: ${password}`);

        // Procurar usuário no banco
        const user = await User.findOne({ username });
        if (!user) {
            console.error(`Login falhou: Usuário não encontrado (${username})`);
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        console.log(`Senha armazenada no banco: ${user.password}`);

        // Verificar a senha
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log(`Resultado da comparação: ${isPasswordValid}`);
        if (!isPasswordValid) {
            console.error(`Senha inválida para: ${username}`);
            return res.status(401).json({ error: "Credenciais inválidas" });
        }

        // Gerar token JWT
        const token = jwt.sign(
            { id: user._id, role: user.role },
            "chave_secreta",
            { expiresIn: "1h" }
        );

        console.log(`Login bem-sucedido para: ${username}`);
        res.json({ token, role: user.role });
    } catch (err) {
        console.error("Erro ao fazer login:", err);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});

// Middleware para verificar autenticação (opcional)
router.use((req, res, next) => {
    console.log(`Rota protegida acessada: ${req.originalUrl}`);
    next();
});

module.exports = router;
