const { Schema, model } = require('mongoose');

const ArmaSchema = new Schema({
  _id: {
    type: Schema.Types.UUID,
    required: true
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
    força: {
      type: Number,
      default: 0
    },
    resistência: {
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
  }]
}, {
  versionKey: false
});

module.exports = model('Armas', ArmaSchema);