const { Schema, model, Types } = require('mongoose');
const Armas = require("./Armas")

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
  vida: {
    type: Number,
    default: 150
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
    default: 10000,
  },
  xp: {
    type: Number,
    default: 0
  },
  nivel: {
    type: Number,
    default: 1
  },
  ataques: [{
    nome: String,
    dano: Number
  }]
}, {
  versionKey: false
});

module.exports = model('Player', PlayerSchema);