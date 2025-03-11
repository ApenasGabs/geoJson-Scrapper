
FROM ghcr.io/puppeteer/puppeteer:latest

RUN apt-get update && apt-get install -y libopencv-dev python3-opencv && rm -rf /var/lib/apt/lists/*

ENV OPENCV4NODEJS_DISABLE_AUTOBUILD=1

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

EXPOSE 3000

CMD [node, mapCapture.js]

