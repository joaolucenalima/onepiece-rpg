const { Schema, model, Types } = require('mongoose');
const Arma = require("./Armas")

const PlayerSchema = new Schema({
  _id: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  vida: {
    type: Number,
    default: 150
  },
  força: {
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
    type: Types.ObjectId,
    ref: Arma,
  },
  ouro: {
    type: Number,
    default: 0,
  },
  xp: {
    type: Number,
    default: 0
  },
  nivel: {
    type: Number,
    default: 1
  }
}, {
  versionKey: false
});

module.exports = model('Player', PlayerSchema);