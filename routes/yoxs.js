const { Router } = require("express");
const { check } = require("express-validator");
const { yoxExiste, categoriaExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  yoxGet,
  yoxGetId,
  yoxGetIdCateg,
  yoxGetIdUser,
  yoxPost,
  yoxPut,
  yoxDel,
} = require("../controllers/yoxs");

const router = Router();

router.get("/", yoxGet);

router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(yoxExiste),
    validarCampos,
  ],
  yoxGetId
);

router.get(
  "/categId/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  yoxGetIdCateg
);

router.get("/user/:id", yoxGetIdUser);

router.post(
  "/",
  [
    validarJWT,
    check("titulo", "El Titulo es obligatorio").not().isEmpty(),
    check("descripcion", "La descripcion es obligatoria").not().isEmpty(),
    check("url", "La url es obligatoria").not().isEmpty(),
    check("categoria", "No es un ID valido").isMongoId(),
    check("categoria").custom(categoriaExiste),
    validarCampos,
  ],
  yoxPost
);

router.put(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(yoxExiste),
    validarCampos,
  ],
  yoxPut
);

router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(yoxExiste),
    validarCampos,
  ],
  yoxDel
);

module.exports = router;
