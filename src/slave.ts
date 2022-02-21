import { CocoaOptions } from "cocoa-discord-utils/template";

import { ActivityOptions, Client, Message } from "discord.js";

import chalk from "chalk";

export const slaves: Parameters<typeof buildSlave>[] = [
    [
        "Skittle 姉ちゃん",
        process.env.SKITTLE_NEE,
        {
            type: "LISTENING",
            name: "Gochiusa OST",
        },
    ],
    [
        "Comrade Vladimir",
        process.env.VLADIMIR,
        {
            type: "WATCHING",
            name: "Comrade",
        },
        async (msg: Message) => {
            console.log(`Uncertified ${msg.content}`);
        },
    ],
    [
        "VSauce",
        process.env.VSAUCE,
        {
            type: "PLAYING",
            name: "With Other Gods",
        },
    ],
    [
        "チノお姉ちゃん",
        process.env.CAPPUCHINO,
        {
            type: "WATCHING",
            name: "Chinoflix",
        },
    ],
];

export function buildSlave(
    name: string,
    token: string | undefined,
    activity?: ActivityOptions,
    onMessage?: (message: Message) => Promise<void>
) {
    if (!token) {
        console.log(chalk.red(`Where is token for ${name}?`));
        return;
    }

    const client = new Client(CocoaOptions);
    client.on("ready", (cli) => {
        console.log(chalk.green(`Slave ${name} is ready as ${cli.user.tag}!`));
        if (onMessage) {
            cli.on("message", async (msg) => {
                await onMessage(msg).catch((err) => {
                    console.log(chalk.red(`${name} just error blyat! ${err}`));
                });
            });
        }
        if (activity) {
            cli.user.setActivity(activity);
            setInterval(() => {
                cli.user.setActivity(activity);
            }, 600000);
        }
    });
    client.login(token);

    return client;
}
