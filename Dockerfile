FROM node:9.0.0

RUN mkdir -p /usr/src/jch-client
COPY .  /usr/src/jch-client
WORKDIR /usr/src/jch-client
RUN npm install
EXPOSE 8080
CMD npm run production
