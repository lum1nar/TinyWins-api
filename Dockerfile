FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# COPY entrypoint script
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh


# Run the application as a non-root user.
USER node

CMD ["sh", "/usr/src/app/docker-entrypoint.sh"]

