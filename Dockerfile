# Stage 1: Node.js dependencies for backend
FROM node:14 AS backend_dependencies

# Set the working directory for backend in the container
WORKDIR /usr/src/app/backend

# Copy backend package.json and package-lock.json to the working directory
COPY backend/package*.json ./

# Install Node.js dependencies for backend
RUN npm install

# Stage 2: Python dependencies
FROM python:3.9 AS python_dependencies

# Set the working directory for Python in the container
WORKDIR /usr/src/app/backend/perchance-image-generator

# Copy Python requirement.txt to the working directory
COPY backend/perchance-image-generator/requirement.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirement.txt

# Stage 3: Node.js dependencies for frontend
FROM node:14 AS frontend_dependencies

# Set the working directory for frontend in the container
WORKDIR /usr/src/app/frontend

# Copy frontend package.json and package-lock.json to the working directory
COPY frontend/package*.json ./

# Install Node.js dependencies for frontend
RUN npm install

# Stage 4: Final image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy backend Node.js dependencies from the first stage
COPY --from=backend_dependencies /usr/src/app/backend/node_modules ./backend/node_modules

# Copy frontend Node.js dependencies from the third stage
COPY --from=frontend_dependencies /usr/src/app/frontend/node_modules ./frontend/node_modules

# Copy the rest of the application code from the host to the working directory
COPY . .

# Expose ports
EXPOSE 3000 4000

# Command to run the application
CMD ["sh", "-c", "cd backend && npm start & cd frontend && npm start"]
