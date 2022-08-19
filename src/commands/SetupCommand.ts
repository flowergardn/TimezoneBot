import { Discord, Slash } from 'discordx';
import { CommandInteraction, Formatters, MessageEmbed } from 'discord.js';

@Discord()
export class SetupCommand {
	@Slash('setup', { description: 'Learn how to setup Timezone Bot' })
	private async setup(interaction: CommandInteraction) {
		const embed = new MessageEmbed().setTitle('Timezone Bot Setup').setDescription('To setup Timezone Bot, you need to do the following:');
		embed.addFields([
			{ name: '1. Create a TimezoneDB account', value: 'Head over to [TimezoneDB](https://tzdb.synapsetech.dev/login), and login with any platform you like.' },
			{ name: '2. Setup your timezone', value: `Once you've logged in, you should see a dropdown of all the supported timezones. Choose your timezone, then make sure to click save!` },
			{ name: '3. Link your Discord account', value: 'Right above the timezone selection, there should be a Discord button. Click it to link your Discord account.' },
			{ name: '4. Done!', value: `Everything should now be setup. Try ${Formatters.inlineCode(`/timezone`)} :)` }
		]);
		embed.setColor('#0099ff');
		await interaction.reply({
			embeds: [embed],
			ephemeral: true
		});
	}
}
