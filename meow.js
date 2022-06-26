require(`dotenv`).config();
const fs = require(`fs`);
const { REST } = require(`@discordjs/rest`);
const { Routes } = require(`discord-api-types/v9`);
const { Client, Intents, Collection } = require(`discord.js`);
const commandFiles = fs.readdirSync(`./commands`).filter((file) => file.endsWith(`.js`));
const commands = [];

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on(`ready`, () => {
  console.log(`Logged as ${client.user.tag} .`);
  client.user.setActivity(`Kedileri`, { type: `WATCHING` });

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: `9`,
  }).setToken(process.env.TOKEN);

  (async () => {
    try {
      if (process.env.ENV === `production`) {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands
        });
        console.log(`Successfully registered slash commands globally`);
      } else {
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
            body: commands,
        });
        console.log(`Successfully registered slash commands locally`);
      }
    } catch (err) {
      if (err) console.log(err);
    }
  })();
});

client.commands = new Collection();

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
}


client.on(`interactionCreate`, async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch(err) {
    if (err) console.log(err);

    await interaction.reply({
      content: `An error occured while executing that command.`,
      emphemral: true
    });
  }
});

client.login(process.env.TOKEN);