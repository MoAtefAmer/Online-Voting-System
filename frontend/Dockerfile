# Use an official Node.js runtime as a parent image
FROM node:14.18.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json .
COPY yarn.lock .

# Install dependencies using Yarn
RUN yarn 

# Copy the rest of the application code to the container
COPY . .

# Build the application using Vite
RUN yarn build

# Expose port 3000 for the application
EXPOSE 5173

# Start the application
CMD ["yarn", "dev"]