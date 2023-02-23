FROM node:16 as base
WORKDIR /app
COPY . .
RUN npm run bootstrap
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start"]
