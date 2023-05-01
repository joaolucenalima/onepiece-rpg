const { SlashCommandBuilder } = require("discord.js");
const Player = require('../models/Player');
const calcularXp = require('../utils/calcularXp');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("perfil") // nome do comando
    .setDescription("Veja seu perfil"), // mini descrição do comando

  async executar(interacao) {

    if (!interacao.user.bot) {

      const playerInfo = await Player.findById(interacao.user.id);

      if (playerInfo.akumaNoMi === 'none') {
        playerInfo.akumaNoMi = "Você não comeu uma akuma no mi.";
      };

      let nomeDaArma;

      if (playerInfo.arma == undefined) {
        nomeDaArma = "Você ainda não equipou uma arma.";
      } else {
        nomeDaArma = playerInfo.arma.nome;
      }

      const xpParaUpar = calcularXp(playerInfo.nivel);

      const embedPerfil = {
        color: 0x0099FF,
        title: interacao.user.username,
        description: `Nível ${playerInfo.nivel}`,
        thumbnail: {
          url: interacao.user.displayAvatarURL({ dynamic: true })
        },
        fields: [
          {
            name: '',
            value: `${playerInfo.xp} xp / ${xpParaUpar} xp`,
          },
          {
            name: '',
            value: `💰 **${playerInfo.ouro} ฿**`,
          },
          {
            name: '\u200b', value: '\u200b'
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
            name: 'Stamina 🔋',
            value: `\`${playerInfo.stamina}\``,
            inline: true,
          },
          {
            name: '\u200b', value: '\u200b',
          },
          {
            name: 'Força 💪',
            value: `\`${playerInfo.forca}\``,
            inline: true,
          },
          {
            name: '\u200b', value: '\u200b', inline: true,
          },
          {
            name: 'Resistência 🛡',
            value: `\`${playerInfo.resistencia}\``,
            inline: true
          },
          {
            name: '\u200b', value: '\u200b'
          },
          {
            name: 'Agilidade ⚡',
            value: `\`${playerInfo.agilidade}\``,
            inline: true,
          },
          {
            name: '\u200b', value: '\u200b', inline: true
          },
          {
            name: 'Precisão 🎯',
            value: `\`${playerInfo.precisao}\``,
            inline: true,
          },
          {
            name: '\u200b', value: '\u200b'
          },
          {
            name: '<:akumanomi:1098031702565191710> Akuma no Mi',
            value: `\`${playerInfo.akumaNoMi}\``,
            inline: true,
          },
          {
            name: '\u200b', value: '\u200b'
          },
          {
            name: '🗡 Arma',
            value: `\`${nomeDaArma}\``,
            inline: true,
          }
        ],
      };

      await interacao.reply({ embeds: [embedPerfil] });
    };
  }

}