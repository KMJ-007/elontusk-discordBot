const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hello')
		.setDescription('Replies with hey @author '),
	async execute(interaction) {
		await interaction.reply(`hey ${author}`);
	},
};