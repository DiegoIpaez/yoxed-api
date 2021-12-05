const express = require("express");
const cors = require("cors");

const { dbConection } = require("../database/config");

class Server {
  constructor() {
    //llamo a otra variable y le asigno todos los metodos de express.
    this.app = express();
    //ruta auth
    this.authPath = "/api/auth";
    //creamos la variable para darle el api a nuestra direc.
    this.usariosPath = "/api/usuarios";
    //ruta categorias
    this.categoriasPath = "/api/categorias";
    //ruta blog
    this.yoxsPath = "/api/yoxs";
    //ruta comentarios
    this.comentariosPath = "/api/comentarios"

    //Conexion
    this.conectarDB();

    //middlewares
    this.middlewares();
    //rutas
    this.routes();
  }

  //Conectando con la BD
  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    //Carpeta public
    this.app.use(express.static("public"));
    //Cors
    this.app.use(cors());
    //Acceso al body, leer y parsear
    this.app.use(express.json());
    //otra manera para parcear |acepta todo tipo de texto en postman|
    //this.app.use(express.urlencoded({extended:true}))
  }

  routes() {
    this.app.use(this.usariosPath, require("../routes/usuarios"));
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.categoriasPath, require("../routes/categorias"));
    this.app.use(this.yoxsPath, require("../routes/yoxs"))
    this.app.use(this.comentariosPath, require("../routes/comentarios"))
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
