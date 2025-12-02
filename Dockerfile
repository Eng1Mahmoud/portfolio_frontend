# Use the official Node.js image as the base image
FROM node:24-alpine
# Set the working directory
WORKDIR /app
# copy package.json and package-lock.json to the working directory
# This allows Docker to cache the npm install step 
COPY package*.json ./
# Install dependencies
RUN npm ci 
# Copy all files from the current directory to the working directory in the container
COPY . .
# Build the Next.js application
RUN npm run build
# Expose the port your app runs on
EXPOSE 3000
# Start the application
CMD ["npm", "start"]