const {Client, Intents, Collection} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});
require('dotenv').config();

client.commands = new Collection();

const fs = require('fs');
const functions = fs.readdirSync("./src/functions/").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events/").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands/");

client.on('ready', () => {
    console.log("ElonTusk is live!");
});
client.on('message', msg =>{
    if(msg.content === 'hey'){
        msg.reply(`hello ${msg.author}`);
    }

    if(msg.mentions.has(client.user.id)){
        msg.channel.send(`hello ${msg.author}`);
    }
});
    for(file of functions){
        require(`./functions/${file}`)(client);
    }

    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");

client.login(process.env.TOKEN);

