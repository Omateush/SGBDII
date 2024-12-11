const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();

// Middleware para processar JSON
app.use(express.json()); // Necessário para lidar com req.body

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Conexão com o MongoDB
mongoose
    .connect("mongodb://localhost:27017/lojaInformatica", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

// Rotas
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const clientesRoutes = require("./routes/clientesRoutes");
app.use("/api/clientes", clientesRoutes);

const produtosRoutes = require("./routes/produtosRoutes");
app.use("/api/produtos", produtosRoutes);


// Rota para lidar com SPA (Single Page Application), redirecionando sempre para `index.html`
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Inicialização do servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
