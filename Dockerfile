# Modified from https://github.com/kaogeek/kaogeek-discord-bot

# ? -------------------------
# ? Builder: Complile TypeScript to JS
# ? -------------------------

FROM node:20-alpine as builder

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable
RUN pnpm install --frozen-lockfile

# copy sources
COPY src ./src
COPY tsconfig.json ./

# compile
RUN pnpm build

# ? -------------------------
# ? Deps-prod: Obtaining node_modules that contains just production dependencies
# ? -------------------------

FROM node:20-alpine as deps-prod

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN corepack enable
RUN pnpm install --frozen-lockfile --prod

# ? -------------------------
# ? Runner: Production to run
# ? -------------------------

FROM node:20-alpine as runner

LABEL name "emu-ootori"

RUN corepack enable

USER node
ENV NODE_ENV production
ENV ENVIRONMENT PRODUCTION

# copy all files from layers above
COPY package.json ./

# copy built files
COPY --chown=node:node --from=deps-prod /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist

RUN pnpm --version

CMD ["pnpm", "start"]
