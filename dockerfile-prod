# Usa una imagen ligera de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install --production

# Copia el código fuente de la aplicación
COPY . .

# Expone el puerto en el que corre tu aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
