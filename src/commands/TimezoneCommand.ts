import { CommandInteraction, ContextMenuInteraction, Formatters, GuildMember, MessageEmbed, User } from 'discord.js';
import { ContextMenu, Discord, Slash, SlashOption } from 'discordx';
import get, { AxiosError } from 'axios';
import { getTime } from '../lib/Utils';

async function getTimezoneEmbed(interaction: CommandInteraction | ContextMenuInteraction, user: User | GuildMember) {
	const username = !(user instanceof GuildMember) ? user.username : user.user.username;

	let tzResponse;
	try {
		tzResponse = await get(`https://tzdbapi.synapsetech.dev/v1/users/byPlatform/discord/${user.id}`);
	} catch (e: AxiosError | Error | any) {
		if (e.response.statusText === 'Not Found') {
			const embed = new MessageEmbed().setTitle('Error').setColor('#eb4c3b');
			return embed.setDescription(`${username} hasn't setup their timezone yet! Tell them to do ${Formatters.inlineCode(`/setup`)}.`);
		}
		return new MessageEmbed().setTitle('Error').setColor('#eb4c3b').setDescription('An error occurred while trying to get your timezone!');
	}

	const tz = tzResponse.data.timezoneInfo.id;
	const time = getTime(tz).format('MMMM D YYYY, h:mm:ss a');

	const embed = new MessageEmbed().setTitle(`${username}'s timezone`);
	embed.setDescription(`They are in the ${tz} timezone`);
	embed.addFields([{ name: 'Current time', value: time }]);
	embed.setColor('#0099ff');

	return embed;
}

@Discord()
export class TimezoneCommand {
	@Slash('timezone', { description: 'View a users timezone' })
	private async tzCommand(
		@SlashOption('user', { description: 'The user to find', type: 'USER', required: true })
		user: GuildMember | User,
		interaction: CommandInteraction
	) {
		await interaction.deferReply();

		const tzEmbed = await getTimezoneEmbed(interaction, user);

		await interaction.editReply({
			embeds: [tzEmbed as MessageEmbed]
		});
	}

	@ContextMenu('USER', 'View Timezone')
	async tzContextMenu(interaction: ContextMenuInteraction) {
		// fetch user from targetId
		if (!interaction.guild) return;
		const user = await interaction.guild.members.fetch(interaction.targetId);

		const tzEmbed = await getTimezoneEmbed(interaction, user);

		await interaction.reply({
			embeds: [tzEmbed as MessageEmbed],
			ephemeral: true
		});
	}
}
