import { EmbedStyle } from "cocoa-discord-utils";
import { CogSlashClass, SlashCommand } from "cocoa-discord-utils/slash/class";
import {
    AutoBuilder,
    Ephemeral,
    getEphemeral,
    getStatusFields,
} from "cocoa-discord-utils/template";

import { Client, CommandInteraction } from "discord.js";

import { clients, slaves } from "../slave";

const style = new EmbedStyle({
    author: "invoker",
    color: 0xff0000,
    footer: { text: "天上太阳红呀红彤彤哎 ❤️❤️❤️" },
});

export class MaoCommander extends CogSlashClass {
    private readonly client: Client;

    constructor(client: Client) {
        super("Mao Commander");
        this.client = client;
    }

    @SlashCommand(
        AutoBuilder("Get Status of Gulag")
            .addBooleanOption(Ephemeral())
            .toJSON()
    )
    async gulagstatus(ctx: CommandInteraction) {
        const ephemeral = getEphemeral(ctx);

        const emb = style
            .use(ctx)
            .setTitle("Gulag's Status")
            .addField({
                name: "Bots Running",
                value: `${slaves.length + 1}`,
                inline: false,
            })
            .addFields(...(await getStatusFields(ctx)));

        await ctx.reply({ embeds: [emb], ephemeral });
    }

    @SlashCommand(
        AutoBuilder("Get List of Bots Running")
            .addBooleanOption(Ephemeral())
            .toJSON()
    )
    async listslaves(ctx: CommandInteraction) {
        const ephemeral = getEphemeral(ctx);

        const emb = style
            .use(ctx)
            .setTitle(`Slaves List: ${slaves.length}`)
            .setDescription(
                clients.map((cli) => `<@${cli?.user?.id}>`).join("\n")
            );

        await ctx.reply({ embeds: [emb], ephemeral });
    }
}
