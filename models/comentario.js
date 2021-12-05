const { Schema, model } = require("mongoose");

const ComentarioSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  yox: {
    type: Schema.Types.ObjectId,
    ref: "Yox",
    required: true,
  },
  comentario: {
    type: String,
  },
  estado:{
    type: Boolean,
    default: true
  },
});



module.exports = model("Comentario", ComentarioSchema)
