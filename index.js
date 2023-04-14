const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");

// dotenv
const dotenv = require('dotenv');
dotenv.config();

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
}

// colocando o bot online
client.once(Events.ClientReady, c => {
  console.log(`${c.user.tag} ESTÁ ON!!`);
});

client.login(process.env.TOKEN);

// listener de interações
client.on(Events.InteractionCreate, async interacao => {

  if (!interacao.isChatInputCommand()) return;

  const comando = interacao.client.commands.get(interacao.commandName)

  if (!comando) return;

  try {
    await comando.executar(interacao);
  } catch (error) {
    console.error(error);
    await interacao.reply("Houve um erro ao executar esse comando!");
  }
})