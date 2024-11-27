const mongoose = require("mongoose");

const produtoSchema = new mongoose.Schema({
    nomeProduto: {
        type: String,
        required: true // Obrigatório
    },
    preco: {
        type: Number,
        required: true, // Obrigatório
        min: [0.01, "O preço deve ser maior que zero"] // Valor maior que zero
    },
    categoria: {
        type: String,
        required: true, // Obrigatório
        enum: ["Periféricos", "Componentes", "Armazenamento", "Monitores"], // Lista pré-definida
        message: "A categoria deve ser uma das opções pré-definidas"
    },
    stock: {
        type: Number,
        required: true, // Obrigatório
        min: [0, "O estoque não pode ser negativo"] // Valor mínimo de 0
    },
    descricao: {
        type: String // Opcional
    }
});

module.exports = mongoose.model("Produto", produtoSchema);
