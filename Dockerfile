FROM node:16-alpine3.14

LABEL version="1.0"
LABEL description="Docker image for the waypost flag provider"

WORKDIR /provider
COPY . /provider/
RUN npm install

EXPOSE 5050

CMD ["npm", "start"]