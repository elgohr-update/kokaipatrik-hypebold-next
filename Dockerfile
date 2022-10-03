FROM node:16

ARG NEXT_PUBLIC_HYPEBOLD_API

ENV NODE_ENV production
ENV NEXT_PUBLIC_HYPEBOLD_API=${NEXT_PUBLIC_HYPEBOLD_API}

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
EXPOSE 3001
CMD ["yarn", "start"]
