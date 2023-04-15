const { Schema, Model } = require('mongoose');

const PlayerSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  akumaNoMi: {
    type: String,
  },
  arma: {
    type: String,
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

module.exports = Model('Player', PlayerSchema);