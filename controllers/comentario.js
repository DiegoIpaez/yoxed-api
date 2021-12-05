const { request, response } = require("express");
const Comentario = require("../models/comentario");

const comentarioGet = async (req = request, res = response) => {
  const [total, comentarios] = await Promise.all([
    Comentario.countDocuments({ estado: true }),
    Comentario.find({ estado: true })
      .populate("usuario", "nombre email")
      .populate("yox", "titulo"),
  ]);

  res.json({
    Total: total,
    comentarios,
  });
};

const comentarioGetId = async (req = request, res = response) => {
  const { id } = req.params;

  const comentario = await Comentario.findById(id)
    .populate("usuario", "nombre email")
    .populate("yox", "titulo");

  res.json({
    comentario,
  });
};

const comentarioGetIdYox = async (req = request, res = response) => {
  const { id } = req.params;

  const [total, comentario] = await Promise.all([
    Comentario.countDocuments(Comentario.find({ yox: id, estado: true })),
    Comentario.find({ yox: id, estado: true }),
  ]);

  res.json({
    Total: total,
    comentario,
  });
};

const comentarioPost = async (req = request, res = response) => {
  const body = req.body;

  const data = {
    ...body,
    usuario: req.usuario._id,
  };

  const coment = new Comentario(data);

  await coment.save();
  res.status(201).json(coment);
};

const comentarioPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, ...resto } = req.body;

  resto.usuario = req.usuario;

  const comentario = await Comentario.findByIdAndUpdate(id, resto, {
    new: true,
  });

  res.json({
    comentario,
  });
};

const comentarioDel = async (req = request, res = response) => {
  const { id } = req.params;

  const comentario = await Comentario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: "Tu comentario ha sido eliminado",
    comentario,
  });
};

module.exports = {
  comentarioGet,
  comentarioGetId,
  comentarioGetIdYox,
  comentarioPost,
  comentarioPut,
  comentarioDel,
};
