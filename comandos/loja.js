const discordjs = require("discord.js");
const Armas = require('../models/Armas');
const Player = require('../models/Player');

module.exports = {

  data: new discordjs.SlashCommandBuilder()
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
        selectOptions.push({ label: arma.nome, emoji: '🗡', value: `${arma._id}` });
      });

      const select = new discordjs.StringSelectMenuBuilder()
        .setCustomId('starter')
        .setPlaceholder('Escolha uma arma para comprar')
        .addOptions(selectOptions);

      const row = new discordjs.ActionRowBuilder().addComponents(select);

      // HOSPEDAR IMAGEM
      //const lojaEspadas = new discordjs.AttachmentBuilder('./assets/loja-espadas.png');

      const embedLoja = {
        color: 0x0099FF,
        title: 'Loja da ilha',
        description: 'Compre suas armas aqui!',
        //thumbnail: { url: 'attachment://loja-espadas.png' },
        fields,
      };

      const resposta = await interacao.reply({ embeds: [embedLoja], /*files: [lojaEspadas],*/ components: [row] });

      const coletor = resposta.createMessageComponentCollector({ componentType: discordjs.ComponentType.StringSelect, time: 100000 });

      coletor.on('collect', async i => {

        const jogador = await Player.findOne({
          _id: i.user.id
        });

        if (!jogador) {
          await interacao.reply("Vc ainda não faz parte do mundo de One Piece 🙁\n\nUse o comando \`/iniciar\` para fazer parte dessa aventura! 🌊 🚢 🔱");
          return;
        };

        const armaSelecionada = await Armas.findById(i.values[0]);

        if (jogador.ouro < armaSelecionada.custo) {
          await i.reply({ content: `${i.user.username}, você não tem ouro suficiente para comprar ${armaSelecionada.nome}. 🙁`, ephemeral: true });
          return;
        };

        const confirm = new discordjs.ButtonBuilder()
          .setCustomId('compra')
          .setLabel('Realizar compra 💰')
          .setStyle(discordjs.ButtonStyle.Success);

        const cancel = new discordjs.ButtonBuilder()
          .setCustomId('cancelar')
          .setLabel('Cancelar')
          .setStyle(discordjs.ButtonStyle.Secondary);

        const row = new discordjs.ActionRowBuilder()
          .addComponents(cancel, confirm);

        const respostaCompra = await i.reply({
          content: `${i.user.username}, você selecionou ${armaSelecionada.nome} para compra, deseja prosseguir?`,
          ephemeral: true,
          components: [row]
        });

        const filter = i => i.user.id === interacao.user.id;
        try {

          const confirmacao = await respostaCompra.awaitMessageComponent({ filter, time: 60000 });

          if (confirmacao.customId === "compra") {

            jogador.ataques.push(armaSelecionada.ataques[0], armaSelecionada.ataques[1]);

            await Player.updateMany(
              {
                _id: i.user.id
              },
              {
                forca: jogador.forca + armaSelecionada.atributos.forca,
                resistencia: jogador.resistencia + armaSelecionada.atributos.resistencia,
                agilidade: jogador.agilidade + armaSelecionada.atributos.agilidade,
                ouro: jogador.ouro - armaSelecionada.custo,
                arma: armaSelecionada,
                ataques: jogador.ataques
              }
            );
            await i.editReply({ content: "Compra realizada com sucesso!!", ephemeral: true, components: [] });
          } else {
            await i.editReply({ content: "Compra cancelada.", ephemeral: true, components: [] });
          }

        } catch (e) {
          console.log(e);
          await i.editReply({ content: 'Confirmação não recebida em 1 minuto, operação cancelada.', components: [] });
        }

      });

    };
  }

}