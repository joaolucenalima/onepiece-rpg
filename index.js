const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const mongoose = require('mongoose');
const fs = require("node:fs");
const path = require("node:path");

// dotenv
require('dotenv').config();

// importação dos comandos
const commandsPath = path.join(__dirname, "comandos");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "executar" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(`Esse comando em ${filePath} está com problema!`);
  }
};

(async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URI, { keepAlive: true });
    console.log('Conectado ao banco de dados!');

    // colocando o bot online
    client.once(Events.ClientReady, c => {
      console.log(`${c.user.username} ESTÁ ON!!`);
    });

    client.login(process.env.TOKEN);

  } catch (error) {
    console.error(error);
  }
})();

// listener de interações
client.on(Events.InteractionCreate, async interacao => {

  if (!interacao.isChatInputCommand()) return;

  const comando = interacao.client.commands.get(interacao.commandName);

  if (!comando) return;

  try {
    await comando.executar(interacao);
  } catch (error) {
    console.error(error);
    await interacao.reply("Houve um erro ao executar esse comando!");
  };
})