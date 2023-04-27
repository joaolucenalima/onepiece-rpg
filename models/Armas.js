const { Schema, model } = require('mongoose');
const uuid = require('uuid');

const ArmaSchema = new Schema({
  _id: {
    type: String,
    default: () => uuid.v4(),
    ref: 'Player'
  },
  nome: {
    type: String,
    required: true
  },
  custo: {
    type: Number,
    required: true
  },
  atributos: {
    forca: {
      type: Number,
      default: 0
    },
    resistencia: {
      type: Number,
      default: 0
    },
    agilidade: {
      type: Number,
      default: 0
    }
  },
  ataques: [{
    nome: String,
    dano: Number
  }],
  equipada: {
    type: Boolean,
    default: false
  },
  compravel: {
    type: Boolean,
  },
  localizacao: {
    type: String,
  }
}, {
  versionKey: false
});

module.exports = model('Armas', ArmaSchema);