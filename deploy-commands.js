const fs = require("node:fs");
const path = require("node:path");
const { REST, Routes } = require("discord.js");

// dotenv
const dotenv = require('dotenv');
dotenv.config();

// importação de comandos
const commandsPath = path.join(__dirname, "comandos");
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

const commands = [];

for (const file of commandsFiles) {
  const command = require(`./comandos/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// deploy
(async () => {
  try {
    const data = await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )
  } catch (error) {
    console.error(error)
  }
})();