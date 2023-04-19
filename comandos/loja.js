const { SlashCommandBuilder, AttachmentBuilder, StringSelectMenuBuilder, ActionRowBuilder } = require("discord.js");
const Armas = require('../models/Armas');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("loja") // nome do comando
    .setDescription("Acesse a loja da ilha."), // mini descrição do comando

  async executar(interacao) {

    if (!interacao.user.bot) {

      const armas = await Armas.find();

      // armas que serão mostradas no embed da loja
      var fields = [{ name: '\u200B', value: '\u200B' }];
      // armas que serão exibidas no select
      var selectOptions = [];

      armas.map(arma => {
        // adiciona armas ao array de campos do embed
        fields.push({ name: `🗡 **${arma.nome}**`, value: `\`฿ ${arma.custo}\`` });
        // adiciona armas ao select
        selectOptions.push({ label: arma.nome, emoji: '🗡', value: arma._id });
      });

      const select = new StringSelectMenuBuilder()
        .setCustomId('starter')
        .setPlaceholder('Escolha uma arma para comprar')
        .addOptions(selectOptions);

      const row = new ActionRowBuilder().addComponents(select);

      const lojaEspadas = new AttachmentBuilder('./assets/loja-espadas.png');

      const embedLoja = {
        color: 0x0099FF,
        title: 'Loja da ilha',
        description: 'Compre suas armas aqui!',
        thumbnail: { url: 'attachment://loja-espadas.png' },
        fields,
      };

      await interacao.reply({ embeds: [embedLoja], files: [lojaEspadas], components: [row] });

    };
  }

}