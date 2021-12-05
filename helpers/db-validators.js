const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Yox = require("../models/yox");
const Comentario = require("../models/comentario");

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }
};
//-----------------------------------------------------------------

const idExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El id '${id}' no existe`);
  }
};

//----------------------------------------------------------------
const categoriaExiste = async (id) => {
  const existeCat = await Categoria.findById(id);

  if (!existeCat) {
    throw new Error(`El id ${id} no existe`);
  }
};

//----------------------------------------------------------------
const yoxExiste = async (id) => {
  const existeYox = await Yox.findById(id);

  if (!existeYox) {
    throw new Error(`El id ${id} no existe`);
  }
};

//----------------------------------------------------------------
const comentarioExiste = async (id) => {
  const existeComent = await Comentario.findById(id);

  if (!existeComent) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  emailExiste,
  idExiste,
  categoriaExiste,
  yoxExiste,
  comentarioExiste,
};
