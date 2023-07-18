FROM node:slim
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3001
CMD node ./src/server.js
RUN apt-get -y update; apt-get -y install curl
HEALTHCHECK --interval=15s --timeout=3s \
    CMD curl -f http://localhost:3001/ping || exit 1