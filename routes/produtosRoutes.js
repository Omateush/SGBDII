const express = require("express");
const router = express.Router();
const Produto = require("../models/produtoModel");
const authMiddleware = require("../middlewares/authMiddleware");

// Criar um produto (Apenas admin)
router.post("/", authMiddleware("admin"), async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obter todos os produtos (Acesso para todos os usuários autenticados)
router.get("/", authMiddleware(), async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um produto (Apenas admin)
router.put("/:id", authMiddleware("admin"), async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(200).json(produto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Deletar um produto (Apenas admin)
router.delete("/:id", authMiddleware("admin"), async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
