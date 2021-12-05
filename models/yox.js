const { Schema, model } = require("mongoose");

const YoxSchema = new Schema({
  titulo: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  descripcion: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  url: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
});


module.exports = model("Yox", YoxSchema)