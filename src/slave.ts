import { CocoaIntent } from "cocoa-discord/template";

import { ActivityOptions, ActivityType, Client, Message } from "discord.js";

import chalk from "chalk";

import { environment } from "./environment.js";

const RussianChars = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

export const slaves: Parameters<typeof buildSlave>[] = [
  [
    "Skittle 姉ちゃん",
    environment.SKITTLE_NEE,
    {
      type: ActivityType.Listening,
      name: "Gochiusa OST",
    },
  ],
  [
    "Comrade Vladimir",
    environment.VLADIMIR,
    {
      type: ActivityType.Watching,
      name: "Comrade",
    },
    async (msg: Message) => {
      if (msg.author.bot) return;
      if (msg.content.split("").some((char) => RussianChars.includes(char))) {
        await msg.reply("сука блять");
      }
    },
  ],
  [
    "ท้าวเวสสุวรรณ",
    environment.WESSUWAN,
    {
      type: ActivityType.Playing,
      name: "With Other Gods",
    },
  ],
  [
    "チノお姉ちゃん",
    environment.CAPPUCHINO,
    {
      type: ActivityType.Watching,
      name: "Chinoflix",
    },
  ],
];

export const clients = slaves.map((slave) => buildSlave(...slave));

export function buildSlave(
  name: string,
  token: string | undefined,
  activity?: ActivityOptions,
  onMessage?: (message: Message) => Promise<void>,
) {
  if (!token) {
    console.log(chalk.red(`Where is token for ${name}?`));
    return;
  }

  const client = new Client(
    new CocoaIntent().useGuild().useGuildMessage().useReadMessage(),
  );
  client.on("ready", (cli) => {
    console.log(chalk.green(`Slave ${name} is ready as ${cli.user.tag}!`));
    if (onMessage) {
      cli.on("messageCreate", async (msg) => {
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
