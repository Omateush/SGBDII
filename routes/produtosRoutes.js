const express = require("express");
const router = express.Router(); // Define o roteador
const Produto = require("../models/produtoModel");

// Criar um produto
router.post("/", async (req, res) => {
    try {
        const produto = new Produto(req.body);
        await produto.save();
        res.status(201).json(produto);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Obter todos os produtos
router.get("/", async (req, res) => {
    try {
        const produtos = await Produto.find();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Obter um produto por ID
router.get("/:id", async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Atualizar um produto por ID
router.put("/:id", async (req, res) => {
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

// Deletar um produto por ID
router.delete("/:id", async (req, res) => {
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

module.exports = router; // Exporta o roteador
