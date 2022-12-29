const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits, Embed } = require("discord.js");
const { token } = require("./config.json");
// const { EmbedBuilder } = require('discord.js');
var todaysUpdaters = new Array();
todaysUpdaters.push('empty');
const keepAlive = require('./serverWake.js');
const scheduleEmbed = require('../node_modules/node-schedule');
const scheduleArchieve = require('../node_modules/node-schedule');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set a new item in the Collection with the key as the command name and the value as the exported module

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}
client.once(Events.ClientReady, () => {
  console.log("Elon is live");
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

//hello message
client.on("messageCreate", (message) => {
  if (message.author.bot) return false;

  if (message.content === "hello Freud") {
    message.channel.send(`hi ${message.author.username}`);
  }

});



//Apreciation Thread on commit 
client.on('messageCreate', async (msg) => {
  let cmtLnk = /https:\/\/github\.com\/.*\/.*\/commit\/[0-9a-f]{40}/;
  if (msg.content.match(cmtLnk) !== null) {

    todaysUpdaters.push(msg.author.username);
    msg.react('🔥')
    const thread = await msg.startThread({
      name: `${msg.author.username}'s AppreciationThread`,
      // autoArchiveDuration: 60, 
    });

    const threadId = thread.id;
    const webhooks = await msg.channel.fetchWebhooks('1035584676238209055', 'jpoVX8at5Pi6N_NwQf7nZ6iYaUjVmUGpSdDBO16Y1tEeYvU9vydcJOUo3veL-lYvLsrF');
    const webhook = webhooks.first();


    await webhook.send({
      content: 'Damnn Bro, You Work too hard !!',
      threadId: threadId,
    });

    scheduleArchieve.scheduleJob('37 18 * * *', async () => {
      thread.setArchived(true);
    });

  }



});


scheduleEmbed.scheduleJob('39 18 * * *', async () => {
  if (todaysUpdaters[0] === 'empty' && todaysUpdaters.length > 1) {
    todaysUpdaters.shift();
  }

  client.channels.cache.get('1035584676238209055').send(`Today's Daily commiters \n${todaysUpdaters}`);
  todaysUpdaters = [];
  todaysUpdaters.push('empty');

});




keepAlive()

client.login(token);
