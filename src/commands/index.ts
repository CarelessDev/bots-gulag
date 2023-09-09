import { EmbedStyle } from "cocoa-discord-utils";
import {
  CogSlashClass,
  Param,
  SlashCommand,
} from "cocoa-discord-utils/slash/class";
import { getStatusFields } from "cocoa-discord-utils/template";

import { Client } from "discord.js";

import { clients, slaves } from "../slave.js";

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

  @SlashCommand("Get Status of Gulag")
  async gulagstatus(
    ctx: SlashCommand.Context,
    @Param.Ephemeral ephemeral: Param.Ephemeral.Type,
  ) {
    const emb = style
      .use(ctx)
      .setTitle("Gulag's Status")
      .addField({
        name: "Bots Running",
        value: `${slaves.length + 1}`,
        inline: false,
      })
      .addFields(...(await getStatusFields(ctx)));

    await ctx.reply({ embeds: [emb], ephemeral: ephemeral ?? false });
  }

  @SlashCommand("Get List of Bots Running")
  async listslaves(
    ctx: SlashCommand.Context,
    @Param.Ephemeral ephemeral: Param.Ephemeral.Type,
  ) {
    const emb = style
      .use(ctx)
      .setTitle(`Slaves List: ${slaves.length}`)
      .setDescription(clients.map((cli) => `<@${cli?.user?.id}>`).join("\n"));

    await ctx.reply({ embeds: [emb], ephemeral: ephemeral ?? false });
  }
}
