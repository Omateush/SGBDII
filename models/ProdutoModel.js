const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nomeProduto: { type: String, required: true },
    preco: { type: Number, required: true },
    categoria: { type: String, required: true },
    stock: { type: Number, required: true },
    descricao: { type: String, required: false },
});

module.exports = mongoose.model("Produto", produtoSchema);
