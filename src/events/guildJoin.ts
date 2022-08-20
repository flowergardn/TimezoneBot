import { ArgsOf, Client, Discord, On } from 'discordx';

@Discord()
class GuildJoin {
	@On('guildCreate')
	async guildCreate(
		[guild]: ArgsOf<'guildCreate'>, // Type guild automatically
		client: Client // Client instance injected here,
	) {
		// There might be a better way to do this, but this is what I came up with.
		await client.guilds.fetch();
		const guildCount = client.guilds.cache.size;
		// TODO: Make this look better with chalk? I'm not sure if AstridLogger would work with TypeScript.
		console.log(`> Joined new guild, ${guildCount} guilds total.`);
	}
}
