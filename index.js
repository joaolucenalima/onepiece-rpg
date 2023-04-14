const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require("node:fs");
const path = require("node:path");

const dotenv = require('dotenv');
dotenv.config();

const commandsPath = path.join(__dirname, "comandos");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection()

for (const file of commandsFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath)

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command)
  } else {
    console.log(`Esse comando em ${filePath} está com problema!`)
  }
}

client.once(Events.ClientReady, c => {
  console.log(`${c.user.tag} ESTÁ ON!!`);
});

client.login(process.env.TOKEN);