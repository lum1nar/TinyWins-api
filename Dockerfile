FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

# Copy the rest of the source files into the image.
COPY . .

# COPY entrypoint script
# COPY docker-entrypoint.sh /usr/src/app/docker-entrypoint.sh
# RUN chmod +x /usr/src/app/docker-entrypoint.sh


# Update: 
# I don't quite get the benefit of running as non-root so I comment it for now
# Run the application as a non-root user.
# USER node

# generate prisma runtime in build time 
# Update: Only in Prod because in Prod we don't need hot reload and we won't mount WORKDIT to the container
# RUN if [ "$NODE_ENV" = "production" ]; then \
#       echo "Production build: generate Prisma client"; \
#       npx prisma generate; \
#     else \
#       echo "Development build: skip generate"; \
#     fi



CMD ["npm", "run", "dev"]

