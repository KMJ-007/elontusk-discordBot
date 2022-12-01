
const { REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9')
const  fs = require('fs');
const clientId = '1047038502384185414';
const guildId = '1047057554880069723';


module.exports = (client) => {
    client.handleCommands = async (commadFolders, path) => {
        client.commandArray = [];
        for(folder of commadFolders){
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));        
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
               
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON()); 
                
               
            }
        }



           
        
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        (async () => {
            try {
                console.log(`Started refreshing ${client.commandArray.length} application (/) commands.`);

                const data = await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId),
                    { body: client.commandArray },
                );

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                    console.error(error);
            }
        })();
    };
};