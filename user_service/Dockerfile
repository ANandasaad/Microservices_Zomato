FROM node:20-alpine

WORKDIR /app

# 1. Copy dependency files
COPY package*.json ./
COPY prisma/schema.prisma ./prisma/

# 2. Install dependencies
RUN npm ci
RUN npx prisma generate

# 3. Copy source code
COPY . .

# 4. Build TypeScript
RUN npm run build  

EXPOSE 3000

# 5. Run compiled JavaScript
CMD ["npm", "start"]  