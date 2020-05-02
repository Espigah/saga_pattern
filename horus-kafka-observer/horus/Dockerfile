FROM node:10

ENV HOME=/usr/src/app

# Create app directory
WORKDIR $HOME

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json npm-shrinkwrap.json ./

RUN npm ci
RUN npm audit fix

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY ./app .

EXPOSE 3000
CMD [ "node", "index.js" ]