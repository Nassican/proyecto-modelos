FROM node:18-alpine

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto de los archivos del proyecto al directorio de trabajo
COPY . .

# Expone el puerto que usará la aplicación (ajústalo según sea necesario)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]