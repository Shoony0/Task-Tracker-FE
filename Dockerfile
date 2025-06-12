# Use official Node.js image as base
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy app source code
COPY . .

# ENV NEXT_IGNORE_TYPE_ERRORS true
ENV NEXT_FONT_DOWNLOAD_DISABLE 1

# Build the app
RUN npm run build

# Production image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Copy built app from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port (default Next.js port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]


# docker build -t task_tracker_fe .
# docker run -p 3000:3000 task_tracker_fe
