# Use the official Node.js 18 image as the base image
FROM node:20.8.0 as development

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Run npm run build to build the application
RUN npm run build

FROM node:20.8.0 as production

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --only=production

# Copy build from development container
COPY --from=development /app/build .

# Set the environment variables
ENV PORT=80

# Expose port 3000
EXPOSE 80

# Start the Node.js server
CMD ["node", "index.js"]