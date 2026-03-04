# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=22.17.0

FROM node:${NODE_VERSION}-alpine


WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# Make sure node user can create direcotry for prisma
RUN chown -R node:node /usr/src/app

# COPY entrypoint script
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh

# Expose the port that the application listens on.
EXPOSE 3000


# Run the application as a non-root user.
USER node


CMD ["sh", "/usr/src/app/docker-entrypoint.sh"]

