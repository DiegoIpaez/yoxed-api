const { request, response } = require("express");

const Yox = require("../models/yox");

const yoxGet = async (req = request, res = response) => {
  let { limite = 4, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 4;
  }
  if (isNaN(desde)) {
    desde = 0;
  }

  //------------------------------------------
  const [total, yoxs] = await Promise.all([
    Yox.countDocuments({ estado: true }),
    Yox.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre email")
      .populate("categoria", "nombre"),
  ]);
  //------------------------------------------

  res.json({
    Total: total,
    yoxs,
  });
};

const yoxGetId = async (req = request, res = response) => {
  const { id } = req.params;

  const yox = await Yox.findById(id)
    .populate("usuario", "nombre email")
    .populate("categoria", "nombre");

  res.json({
    yox,
  });
};

const yoxGetIdCateg = async (req = request, res = response) => {
  const { id } = req.params;

  const [total, yox] = await Promise.all([
    Yox.countDocuments(Yox.find({ categoria: id, estado: true })),
    Yox.find({ categoria: id, estado: true }),
  ]);

  res.json({
    Total: total,
    yox,
  });
};

const yoxPost = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;


  const yoxDB = await Yox.findOne({
    titulo: body.titulo.toUpperCase(),
  });

  if (yoxDB) {
    return res.status(400).json({
      msg: `el yox ${yoxDB.titulo} ya existe`,
    });
  }

  const data = {
    ...body,
    titulo: body.titulo.toUpperCase(),
    usuario: req.usuario._id,
  };

  const yox = new Yox(data);

  await yox.save();

  res.json({
    yox,
  });
};

const yoxPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, estado, usuario, ...resto } = req.body;

  if (resto.titulo) {
    resto.titulo = resto.titulo.toUpperCase();
  }

  resto.usuario = req.usuario._id;

  const yox = await Yox.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msg: "Yox actualizado",
    yox,
  });
};

const yoxDel = async (req = request, res = response) => {
  const { id } = req.params;

  const yox = await Yox.findByIdAndUpdate(id, { estado: false }, { new: true });

  res.json({
    msg: "Yox eliminado",
    yox,
  });
};

module.exports = {
  yoxGet,
  yoxGetId,
  yoxGetIdCateg,
  yoxPost,
  yoxPut,
  yoxDel,
};
