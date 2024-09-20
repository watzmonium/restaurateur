FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN apt-get update && apt-get install -y build-essential && apt-get install -y python3 && npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]