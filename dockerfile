FROM node:latest
COPY . .
RUN npm install -y method-override
RUN npm install -y mongoose
RUN npm install -y connect-flash
RUN npm install -y express-session
RUN npm install -y passport
RUN npm install -y passport-local
RUN npm install -y bcrypt-nodejs
RUN npm install -y ejs
EXPOSE 3000
WORKDIR /
CMD node index.js
