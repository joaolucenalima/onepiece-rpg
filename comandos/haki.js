const { SlashCommandBuilder } = require("discord.js");
const Player = require("../models/Player");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("haki") // nome do comando
    .setDescription("Acompanhe o desenvolvimento do seu haki."), // mini descrição do comando

  async executar(interacao) {

    const jogador = await Player.findById(interacao.user.id);

    if (jogador.nivel < 20) {
      await interacao.reply("O Haki é despertado com a experiência. Alcance o nível 20 para começar a usá-lo.");
      return;
    };

    await interacao.reply("Pong!") // resposta do bot
  }

}