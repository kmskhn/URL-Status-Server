# Use a lightweight Node.js image as the base
FROM node:lts-alpine

# Set the working directory within the container
WORKDIR /app

# Copy the package.json file for dependency installation
COPY package*.json ./

# Install dependencies using npm
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port used by your server (5000 by default)
EXPOSE 5000

# Start the server using npm start (adjust if your server has a different start command)
CMD [ "npm", "start" ]