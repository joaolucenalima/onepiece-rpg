const { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const Player = require('../models/Player');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("iniciar") // nome do comando
    .setDescription("Inicie sua jornada no mundo de One Piece!"), // mini descrição do comando

  async executar(interacao) {

    const playerCadastrado = await Player.findOne({
      _id: interacao.user.id
    });

    if (playerCadastrado) {
      await interacao.reply(`Você já está no mundo de One Piece, ${playerCadastrado.userName}!`);
      return;
    };

    if (!interacao.user.bot) {

      const lutador = new ButtonBuilder()
        .setCustomId('lutador')
        .setLabel('Lutador 👊')
        .setStyle(ButtonStyle.Primary);

      const atirador = new ButtonBuilder()
        .setCustomId('atirador')
        .setLabel('Atirador')
        .setStyle(ButtonStyle.Primary);

      const espadachim = new ButtonBuilder()
        .setCustomId('espadachim')
        .setLabel('Espadachim 🗡')
        .setStyle(ButtonStyle.Primary);

      const row = new ActionRowBuilder()
        .addComponents(lutador, atirador, espadachim);

      const respostaClasse = await interacao.reply({
        content: "Seja bem-vindo(a) ao mundo de One Piece, Jogador(a)!! \n\n Escolha uma classe para prosseguir: \n (Você ainda conseguirá upar as outras características, não se preocupe!)",
        components: [row]
      });

      const filter = i => i.user.id === interacao.user.id;
      try {

        const classe = await respostaClasse.awaitMessageComponent({ filter, time: 60000 });

        const newPlayer = new Player({
          _id: interacao.user.id,
          userName: interacao.user.username,
          avatar: interacao.user.avatar,
          classe: classe.customId,
          ataques: [{
            nome: "Soco",
            dano: "25"
          },
          {
            nome: "Chute",
            dano: "20"
          },
          {
            nome: "Bloqueio",
            dano: 0
          }
          ]
        });

        await newPlayer.save();

        await i.editReply("Ótima escolha, jogador(a)!");

      } catch (err) {
        console.log(err);
      };
    }
  }

}