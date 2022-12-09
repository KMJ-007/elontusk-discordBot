const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const keepAlive = require('./serverWake.js');

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
  console.log("Freud is live");
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

<<<<<<< HEAD
//hello message
=======
>>>>>>> c1325b45b239344232aa3896191173ccaacf9a2b
client.on("messageCreate", (message) => {
  if (message.author.bot) return false;

  if (message.content === "hello Freud") {
    message.channel.send(`hi ${message.author.username}`);
  }

});

<<<<<<< HEAD

//Apreciation Thread on commit 
client.on('messageCreate', async (msg) => {
  let cmtLnk = /https:\/\/github\.com\/.*\/.*\/commit\/[0-9a-f]{40}/;

  if (msg.content.match(cmtLnk) !== null) {

    msg.react('🔥')
    const thread =  await msg.channel.threads.create({
      name: "AppreciationThread",  
    }); 
    const threadId = thread.id;
  

    const webhooks = await msg.channel.fetchWebhooks();
    const webhook = webhooks.first();

    await webhook.send({
      content: 'Damnn Bro, You Work too hard !!',
      threadId: threadId,
    });
  }
});


=======
client.on('messageCreate', (msg) => {
  if (msg.content.includes('google.com/')) {
    msg.delete()
      .then(msg.channel.send("Link Deleted:\n**Don't Send links in the channel**"))
  }
})
>>>>>>> c1325b45b239344232aa3896191173ccaacf9a2b

keepAlive()

client.login(token);
