const express = require("express");
const cors = require("cors");

class Server {
  constructor() {
    //llamo a otra variable y le asigno todos los metodos de express.
    this.app = express();

    //middlewares
    this.middlewares();
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

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
}

module.exports = Server;
