FROM node:16 as base
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./
COPY . /app
RUN npm run build

EXPOSE 3001
CMD ["npm", "run", "start"]
