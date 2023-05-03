const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("inventario") // nome do comando
    .setDescription("Exibe seu inventário"), // mini descrição do comando

  async executar(interacao) {
    await interacao.reply("Esse comando ainda não está pronto!");
  }

}