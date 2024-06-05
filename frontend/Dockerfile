FROM node:18-alpine
WORKDIR /app

# Copiar solo los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto
EXPOSE 3000

# Para desarrollo, usamos `npm run dev`
CMD ["npm", "run", "dev"]