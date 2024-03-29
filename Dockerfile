FROM node:18-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN yarn install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD [ "yarn", "dev" ]
