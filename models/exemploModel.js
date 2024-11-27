const mongoose = require("mongoose");

const exemploSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    idade: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model("Exemplo", exemploSchema);
