const { Schema, model } = require('mongoose');

const PlayerSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  escolha: {
    type: String,
    default: "none"
  },
  classe: {
    type: String,
  },
  vida: {
    type: Number,
    default: 150
  },
  stamina: {
    type: Number,
    default: 100
  },
  forca: {
    type: Number,
    default: 20
  },
  resistencia: {
    type: Number,
    default: 18
  },
  agilidade: {
    type: Number,
    default: 2
  },
  precisao: {
    type: Number,
    default: 20
  },
  akumaNoMi: {
    type: String,
    default: 'none'
  },
  arma: {
    type: Object,
    ref: 'Armas',
  },
  ouro: {
    type: Number,
    default: 200000,
  },
  xp: {
    type: Number,
    default: 0
  },
  nivel: {
    type: Number,
    default: 1
  },
  localizacao: {
    type: String,
    default: 'East Blue'
  },
  ataques: [{
    nome: String,
    dano: Number
  }]
}, {
  versionKey: false
});

module.exports = model('Player', PlayerSchema);