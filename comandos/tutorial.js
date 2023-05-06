const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
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

    const pirata = new ButtonBuilder()
      .setCustomId('pirata')
      .setLabel('Pirata')
      .setStyle(ButtonStyle.Primary);

    const marinheiro = new ButtonBuilder()
      .setCustomId('marinheiro')
      .setLabel('Marinha')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder()
      .addComponents(pirata, marinheiro);

    const resposta = await interacao.reply({
      content: `Olá novamente, ${jogador.userName}!\nÉ ótimo ver que você decidiu continuar nesse jogo! <:okluffy:1103084283293335624>\nAgora você realizará uma missão para aprender algumas coisas básicas.`,
      components: [row],
      ephemeral: true
    });

    try {

      const escolha = await resposta.awaitMessageComponent({ time: 60000 });

      await Player.updateOne({
        _id: interacao.user.id
      }, {
        escolha: escolha.customId
      });

      const cargosParaRemover = interacao.member._roles;
      interacao.member.roles.remove(cargosParaRemover);

      await interacao.editReply({
        content: `Seja bem-vindo ao RPG, ${escolha.customId}!`,
        ephemeral: true,
        components: []
      });

      if (escolha.customId === 'marinheiro') {
        const cargoMarinha = interacao.member.guild.roles.cache.get('1103819231717490719');
        interacao.member.roles.add(cargoMarinha);
      } else {
        const cargoPirata = interacao.member.guild.roles.cache.get('1104274406890545203');
        interacao.member.roles.add(cargoPirata);
      }

    } catch (err) {
      console.log(err);
      await interacao.editReply({ content: 'Confirmação não recebida em 1 minuto, operação cancelada.', components: [] });
    }
  }
}