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
  }
}, {
  versionKey: false
});

module.exports = model('Armas', ArmaSchema);