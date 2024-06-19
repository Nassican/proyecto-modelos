# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos de dependencias de la aplicación
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código de la aplicación
COPY . .

# Expón el puerto que está usando tu servidor
EXPOSE 3002

# Comando para ejecutar la aplicación
CMD ["node", "server.js"]
