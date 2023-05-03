const { SlashCommandBuilder } = require("discord.js");
const Player = require("../models/Player");

module.exports = {

  data: new SlashCommandBuilder()
    .setName("tutorial") // nome do comando
    .setDescription("Inicia o tutorial"), // mini descrição do comando

  async executar(interacao) {

    const jogador = await Player.findById(interacao.user.id);

    if (jogador.escolha != "none") {
      await interacao.reply(`Você já terminou o tutorial, ${jogador.userName}!`);
      return;
    };

    await interacao.reply(
      `Olá novamente, ${jogador.userName}!\n É ótimo ver que você decidiu realmente jogar esse jogo! <:okluffy:1103084283293335624>\n Agora você realizará uma missão para aprender algumas coisas básicas.`
    );
  }

}