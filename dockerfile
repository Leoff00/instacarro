FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY ./package.json /app
COPY ./pnpm-lock.yaml /app

RUN pnpm install

COPY . /app

RUN pnpm build

EXPOSE 3001

ENTRYPOINT ["pnpm", "prod"]