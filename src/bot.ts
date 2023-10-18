import { setConsoleEvent } from "cocoa-discord";
import { SlashCenter } from "cocoa-discord/slash";
import { CocoaIntent } from "cocoa-discord/template";

import { ActivityType, Client } from "discord.js";

import chalk from "chalk";

import { Emu } from "./commands/emu.js";
import { MaoCommander } from "./commands/index.js";
import { environment } from "./environment.js";
import { clients } from "./slave.js";

const MaoClient = new Client(new CocoaIntent().useGuild());

const center = new SlashCenter(MaoClient, "Global");
center.addModules(new MaoCommander(MaoClient), new Emu());
center.validateCommands();

MaoClient.on("ready", (cli) => {
  console.log(chalk.cyan(`Mao Commander is Ready as ${cli.user.tag}!`));
  center.syncCommands();

  cli.user.setActivity({
    type: ActivityType.Listening,
    name: "CPP Anthem",
  });
  setInterval(() => {
    cli.user.setActivity({
      type: ActivityType.Listening,
      name: "CPP Anthem",
    });
  }, 600000);
});

MaoClient.login(environment.MAO_TOKEN);

// * Console Zone
setConsoleEvent(async (cmd: string) => {
  if (cmd.startsWith("logout")) {
    const mp = MaoClient.destroy();
    await Promise.all(clients.map((cli) => cli?.destroy()));
    await mp;
    console.log(chalk.cyan("Logged out Successfully!"));
    process.exit(0);
  }

  console.log(
    chalk.yellow(`[Console WARN] Unknown Command ${cmd.split(" ")[0]}`),
  );
});

process.on("SIGINT", async () => {
  const mp = MaoClient.destroy();
  await Promise.all(clients.map((cli) => cli?.destroy()));
  await mp;
  console.log(chalk.cyan("Logged out Successfully!"));
  process.exit(0);
});
