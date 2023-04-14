const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("ping") // nome do comando
    .setDescription("Responde com 'Pong!'"), // mini descrição do comando

  async executar(interacao) {
    await interacao.reply("Pong!")
  }

}