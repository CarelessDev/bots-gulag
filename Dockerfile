FROM oven/bun:1.0.15-alpine as installer

COPY package.json bun.lockb ./

RUN bun install --production --frozen-lockfile

FROM oven/bun:1.0.15-alpine as runner

USER bun

COPY --chown=bun:bun src ./src
COPY --chown=bun:bun package.json  ./
COPY --chown=bun:bun --from=installer /home/bun/app/node_modules ./node_modules

CMD ["bun", "run", "start"]
