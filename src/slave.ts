import { CocoaIntent } from "cocoa-discord/template";

import { ActivityOptions, ActivityType, Client, Message } from "discord.js";

import chalk from "chalk";

import { getEmu } from "./emuChance.js";
import { environment } from "./environment.js";

const RussianChars = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

export const slaves: Parameters<typeof buildSlave>[] = [
  [
    "Skittle 姉ちゃん",
    environment.SKITTLE_NEE,
    new CocoaIntent(),
    {
      type: ActivityType.Listening,
      name: "Gochiusa OST",
    },
  ],
  [
    "Comrade Vladimir",
    environment.VLADIMIR,
    new CocoaIntent()
      .useGuild()
      .useGuildMessage()
      .useDirectMessage()
      .useReadMessage(),
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
    new CocoaIntent(),
    {
      type: ActivityType.Playing,
      name: "With Other Gods",
    },
  ],
  [
    "チノお姉ちゃん",
    environment.CAPPUCHINO,
    new CocoaIntent(),
    {
      type: ActivityType.Watching,
      name: "Chinoflix",
    },
  ],
  [
    "鳳えむ",
    environment.EMU,
    new CocoaIntent().useGuild().useGuildMessage().useReadMessage(),
    {
      type: ActivityType.Streaming,
      name: "Asahina Senpai, Wonderhoy!",
      url: "https://www.youtube.com/watch?v=2p1R7btCf_Q&t=32",
    },
    async (msg: Message) => {
      if (msg.author.bot || msg.author.id !== environment.EMU_TARGET) return;

      if (Math.random() < getEmu() / 100) {
        const guild =
          msg.client.guilds.cache.get(environment.EMU_GUILD) ??
          (await msg.client.guilds.fetch(environment.EMU_GUILD));

        const sticker =
          guild.stickers.cache.get(environment.EMU_STICKER) ??
          (await guild.stickers.fetch(environment.EMU_STICKER));

        await msg.reply({
          stickers: [sticker],
        });
      }
    },
  ],
];

export const clients = slaves.map((slave) => buildSlave(...slave));

export function buildSlave(
  name: string,
  token: string | undefined,
  intents: CocoaIntent,
  activity?: ActivityOptions,
  onMessage?: (message: Message) => Promise<void>,
) {
  if (!token) {
    console.log(chalk.red(`Where is token for ${name}?`));
    return;
  }

  const client = new Client(intents);
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
