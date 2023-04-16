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
  dano: {
    type: Number,
    required: true
  },
  ataques: {
    type: Number,
    required: true
  }
}, {
  versionKey: false
});

module.exports = model('Arma', ArmaSchema);