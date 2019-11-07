FROM node:10.7

RUN mkdir -p /usr/src/amps
WORKDIR /usr/src/amps

COPY . /usr/src/amps

RUN npm i
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
