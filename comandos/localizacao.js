const { SlashCommandBuilder } = require("discord.js");
const Player = require('../models/Player');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("localização") // nome do comando
    .setDescription("Mostra sua localização atual."), // mini descrição do comando

  async executar(interacao) {

    if (!interacao.user.bot) {

      const { localizacao } = await Player.findById(interacao.user.id);

      if (localizacao != 'mar') {
        await interacao.reply(`Atualmente você está em ${localizacao}.`);
      } else {
        await interacao.reply(`Atualmente você está no mar! 🌊 🚢`);
      }

    }
  }
}