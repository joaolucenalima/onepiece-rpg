const { SlashCommandBuilder } = require("discord.js");
const Armas = require('../models/Armas');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("loja") // nome do comando
    .setDescription("Acesse a loja da ilha."), // mini descrição do comando

  async executar(interacao) {

    const armas = await Armas.find();

    console.clear()
    console.log(armas);

    if (!interacao.user.bot) {

      const { EmbedBuilder } = require('discord.js');

      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Loja da ilha')
        .setDescription('Compre suas armas aqui!')
        .setImage('../assets/loja-espadas.png')
        .addFields(
          { name: '\u200B', value: '\u200B' },
          { name: 'Inline field title', value: 'Some value here', inline: true },
          { name: 'Inline field title', value: 'Some value here', inline: true },
        )

      await interacao.reply({ embeds: [exampleEmbed] });

    };
  }

}