const { SlashCommandBuilder } = require("discord.js");
const Player = require('../models/Player');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("iniciar") // nome do comando
    .setDescription("Inicie sua jornada no mundo de One Piece!"), // mini descrição do comando

  async executar(interacao) {

    const playerCadastrado = await Player.findOne({
      userId: interacao.user.id
    });

    if (playerCadastrado) {
      await interacao.reply(`Você já está no mundo de One Piece, ${playerCadastrado.userName}!`);
      return;
    };

    if (!interacao.user.bot) {
      const newPlayer = new Player({
        _id: interacao.user.id,
        userName: interacao.user.username
      });

      await newPlayer.save();

      await interacao.reply("Seja bem-vindo(a) ao mundo de One Piece, Jogador(a)!!");
    };
  }

}