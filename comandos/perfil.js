const { SlashCommandBuilder } = require("discord.js");
const Player = require('../models/Player');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("perfil") // nome do comando
    .setDescription("Veja seu perfil"), // mini descrição do comando

  async executar(interacao) {

    if (!interacao.user.bot) {

      const playerInfo = await Player.findById(interacao.user.id)

      const embedPerfil = {
        color: 0x0099FF,
        title: interacao.user.username,
        description: `Nível ${playerInfo.nivel} -------------- ${playerInfo.xp} xp`,
        thumbnail: {
          url: interacao.user.displayAvatarURL({ dynamic: true })
        },
        fields: [
          {
            name: '',
            value: `💰 **${playerInfo.ouro} ฿**`,
            inline: true
          },
          {
            name: '\u200b',
            value: '\u200b'
          },
          {
            name: 'Vida 💚',
            value: `\`${playerInfo.vida}\``,
            inline: true,
          },
          {
            name: '\u200b', value: '\u200b', inline: true
          },
          {
            name: 'Força 💪',
            value: `\`${playerInfo.forca}\``,
            inline: true,
          },
          {
            name: '\u200b',
            value: '\u200b',
          },
          {
            name: 'Resistência 🛡',
            value: `\`${playerInfo.resistencia}\``,
            inline: true
          },
          {
            name: '\u200b', value: '\u200b', inline: true
          },
          {
            name: 'Agilidade ⚡',
            value: `\`${playerInfo.agilidade}\``,
            inline: true,
          },
        ],
      };

      await interacao.reply({ embeds: [embedPerfil] });

    };
  }

}