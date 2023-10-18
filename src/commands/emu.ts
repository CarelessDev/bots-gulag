import {
  Param,
  SlashCommand,
  SlashModuleClass,
} from "cocoa-discord/slash/class";

import { getEmu, setEmu } from "../emuChance.js";

export class Emu extends SlashModuleClass {
  constructor() {
    super("Emu management");
  }

  @SlashCommand("Set emu chance")
  async setemu(
    ctx: SlashCommand.Context,
    @Param.Number("Chance") chance: number,
  ) {
    if (chance < 0 || chance > 100) {
      await ctx.reply("Chance must be between 0 and 100");
      return;
    }

    setEmu(chance);
    await ctx.reply(`Set emu chance to ${chance}%`);
  }

  @SlashCommand("Get emu chance")
  async getemu(
    ctx: SlashCommand.Context,
    @Param.Ephemeral ephemeral: Param.Ephemeral.Type,
  ) {
    await ctx.reply({
      content: `Current chance is ${getEmu()}%`,
      ephemeral: ephemeral ?? false,
    });
  }
}
