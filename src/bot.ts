import "dotenv/config";

import { setConsoleEvent } from "cocoa-discord-utils";
import { SlashCenter } from "cocoa-discord-utils/slash";
import { CocoaOptions } from "cocoa-discord-utils/template";

import { Client } from "discord.js";

import chalk from "chalk";

import { MaoCommander } from "./commands";
import { clients } from "./slave";

const MaoClient = new Client(CocoaOptions);

const center = new SlashCenter(
    MaoClient,
    process.env.GUILD_IDS?.split(",") ?? []
);
center.addCog(new MaoCommander(MaoClient));
center.validateCommands();

MaoClient.on("ready", (cli) => {
    console.log(chalk.cyan(`Mao Commander is Ready as ${cli.user.tag}!`));
    center.syncCommands();
    cli.user.setActivity({
        type: "LISTENING",
        name: "CPP Anthem",
    });
    setInterval(() => {
        cli.user.setActivity({
            type: "LISTENING",
            name: "CPP Anthem",
        });
    }, 600000);
});

MaoClient.login(process.env.MAO_TOKEN);

// * Console Zone
setConsoleEvent((cmd: string) => {
    if (cmd.startsWith("logout")) {
        MaoClient.destroy();
        clients.map((cli) => cli?.destroy());
        console.log(chalk.cyan("Logged out Successfully!"));
        process.exit(0);
    }

    console.log(
        chalk.yellow(`[Console WARN] Unknown Command ${cmd.split(" ")[0]}`)
    );
});
