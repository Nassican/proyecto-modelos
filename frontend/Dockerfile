# Etapa 1: Construcción
FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

# Copiar solo los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json ./

# Instalar dependencias sin generar archivos innecesarios
RUN npm ci

# Copiar el resto de los archivos del proyecto
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Copiar archivos necesarios desde la etapa de construcción
COPY --from=BUILD_IMAGE /app/package.json /app/package-lock.json ./
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/next.config.mjs ./
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules

# Configurar la variable de entorno
ENV NODE_ENV=production

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
