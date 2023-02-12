# Use an existing node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json file
COPY package.json .

# Install the dependencies
RUN npm install

# Copy the remaining files
COPY . .

# Set the command to run when the container starts
CMD ["npm", "start"]
