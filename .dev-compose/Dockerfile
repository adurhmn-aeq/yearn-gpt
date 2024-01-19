FROM node:18-slim

WORKDIR /app

# install pnpm
RUN ["wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -"]


# COPY /app .
# COPY package.json .
# COPY pnpm-lock.yaml .
# COPY pnpm-workspace.yaml .
# COPY yarn.lock .

RUN ["pnpm", "install"]

CMD ["yarn", "dev", "&", "cd", "/server", "&&",  "yarn", "dev"]

