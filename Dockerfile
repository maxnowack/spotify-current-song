FROM node:9.4.0-alpine
MAINTAINER Max Nowack <max@unsou.de>

EXPOSE 3000

RUN apk update && apk upgrade && apk add --no-cache git

WORKDIR /app
ADD package.json package.json
RUN npm install --production
ADD dist dist
ADD .env .env
CMD ["npm", "start"]
