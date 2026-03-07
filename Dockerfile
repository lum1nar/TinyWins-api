FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# COPY entrypoint script
COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
RUN chmod +x /usr/src/app/docker-entrypoint.sh


# Update: I don't quite get the benefit of running as non-root so I comment it for now
#
# Run the application as a non-root user.
# USER node

# generate prisma runtime in build time
RUN npx prisma generate
# RUN npx prisma migrate deploy 


CMD ["bash", "/usr/src/app/docker-entrypoint.sh"]

