const { SlashCommandBuilder } = require("discord.js");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("iniciar") // nome do comando
    .setDescription("Entre no mundo de One Piece!"), // mini descrição do comando

  async executar(interacao) {
    await interacao.reply("Seja bem-vindo(a) ao mundo de One Piece, Jogador(a)!!")
  }

}