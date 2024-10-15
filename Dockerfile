FROM node:20-alpine as builder

WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate

# Creates a "dist" folder with the production build
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]