import { importx } from '@discordx/importer';
import { Client } from 'discordx';
import { Intents } from 'discord.js';

require('dotenv').config();

export const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS],
	silent: false
});

client.on('interactionCreate', (interaction) => {
	client.executeInteraction(interaction);
});

client.on('ready', async () => {
	await client.clearApplicationCommands();
	await client.initApplicationCommands();

	console.log('> Bot online, logged in as: ' + client.user!!.tag);
});

async function start() {
	await importx(__dirname + '/commands/*.{js,ts}');
	await importx(__dirname + '/events/*.{js,ts}');
	await client.login(process.env.TOKEN!!);
}

start();
