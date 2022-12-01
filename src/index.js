const Discord = require('discord.js')
const dotenv = require("dotenv")
const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
require('dotenv').config({path:'F:\\DiscordBot\\.env'})
const client = new Discord.Client();

client.once('ready', () => {
    console.log("ElonTusk is live !");
});

client.on('ready',() => {
    console.log(`logged in as ${client.user.tag}`)
});
client.on('message', msg => {
    if(msg.autor.bot) { return}


    else if(msg.content.startsWith("hello")) {
        msg.channel.send(`hello ${msg.author}`);
    } 
});
// const DISCORD_TOKEN = process.env.TOKEN;
// console.log(DISCORD_TOKEN);
// console.log(DISCORD_TOKEN);
//client.login(`'${DISCORD_TOKEN}'`);
client.login(process.env.TOKEN);
