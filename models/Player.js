const { Schema, model } = require('mongoose');

const PlayerSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  akumaNoMi: {
    type: String,
    default: 'none'
  },
  arma: {
    type: String,
    default: 'none'
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
    default: 0
  }
});

module.exports = model('Player', PlayerSchema);