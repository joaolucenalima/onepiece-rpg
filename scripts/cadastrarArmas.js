const mongoose = require('mongoose');
const Armas = require('../models/Armas');

// configurando variáveis do .env para uso
require('dotenv').config();

// conectando ao banco de dados
(async () => {
  mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });

  const newArma = new Armas({
    nome: "Espada Básica",
    custo: 50000,
    atributos: {
      forca: 10,
      resistencia: 7,
      agilidade: 0
    },
    ataques: [
      {
        nome: "Corte",
        dano: 20,
      },
      {
        nome: "Nitoryu",
        dano: 50,
      }
    ]
  });

  await newArma.save();

  // desconecta do banco de dados
  mongoose.connection.close();

})();