const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const Armas = require('../models/Armas');

module.exports = {

  data: new SlashCommandBuilder()
    .setName("loja") // nome do comando
    .setDescription("Acesse a loja da ilha."), // mini descrição do comando

  async executar(interacao) {

    if (!interacao.user.bot) {

      const armas = await Armas.find();

      var fields = [{ name: '\u200B', value: '\u200B' }];

      armas.map(arma => {
        fields.push({ name: `🗡 **${arma.nome}**`, value: `\`฿ ${arma.custo}\`` });
      });

      const lojaEspadas = new AttachmentBuilder('./assets/loja-espadas.png');

      const embedLoja = {
        color: 0x0099FF,
        title: 'Loja da ilha',
        description: 'Compre suas armas aqui!',
        thumbnail: { url: 'attachment://loja-espadas.png' },
        fields,
      };

      await interacao.reply({ embeds: [embedLoja], files: [lojaEspadas] });

    };
  }

}