const { Router } = require("express");
const { check } = require("express-validator");
const { comentarioExiste, yoxExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  comentarioGet,
  comentarioGetId,
  comentarioGetIdYox,
  comentarioPost,
  comentarioPut,
  comentarioDel,
} = require("../controllers/comentario");

const router = Router();

router.get("/", comentarioGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(comentarioExiste),
    validarCampos,
  ],
  comentarioGetId
);

router.get(
  "/yoxId/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(yoxExiste),
    validarCampos,
  ],
  comentarioGetIdYox
);

router.post(
  "/",
  [
    validarJWT,
    check(
      "comentario",
      "El comentario no debe tener mas de 500 caracteres"
    ).isLength({
      max: 500,
    }),
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(yoxExiste),
    validarCampos,
  ],
  comentarioPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(comentarioExiste),
    validarCampos,
  ],
  comentarioPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(comentarioExiste),
    validarCampos,
  ],
  comentarioDel
);

module.exports = router;
