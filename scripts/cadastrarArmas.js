const mongoose = require('mongoose');
const Armas = require('../models/Armas');

// configurando variáveis do .env para uso
require('dotenv').config();

// conectando ao banco de dados
mongoose.connect(process.env.MONGODB_URI);

const newArma = new Armas({
  nome: "",
  custo: 0,
  atributos: {
    forca: 0,
    resistencia: 0,
    agilidade: 0
  },
  ataques: [
    {
      nome: "",
      dano: 0,
    }
  ]
});

newArma.save();

// desconecta do banco de dados
mongoose.connection.close()