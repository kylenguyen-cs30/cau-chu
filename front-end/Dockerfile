#
# # Use Node.js LTS version from Docker Hub
# FROM node:18
#
# # Set the working directory in the container
# WORKDIR /app
#
# # Copy the package.json and yarn.lock files
# COPY package.json yarn.lock ./
#
# # Install dependencies
# RUN yarn install
#
# # Copy the rest of the application code
# COPY . .
#
# # Build the Next.js application
# RUN yarn build
#
# # Expose the port that Next.js will run on
# EXPOSE 3000
#
# # Start the Next.js application
# CMD ["yarn", "start"]
#


# Use Node.js LTS version from Docker Hub
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js will run on
EXPOSE 3000

# Start the Next.js application in development mode
CMD ["yarn", "dev"]

