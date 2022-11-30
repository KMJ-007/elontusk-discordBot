const Discord = require('discord.js')
const dotenv = require("dotenv")
dotenv.config()
const client = new Discord.Client();

client.once('ready', () => {
    console.log("ElonTusk is live !");
});

client.login(process.env.TOKEN);
