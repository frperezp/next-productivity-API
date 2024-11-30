# Etapa 1: Construcción de la aplicación
FROM node:18-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios para instalar las dependencias
COPY package.json package-lock.json ./

# Instalar las dependencias
RUN npm install --production=false

# Copiar el código fuente de la aplicación
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Imagen final optimizada
FROM nginx:alpine

# Copiar los archivos de construcción desde la etapa anterior
COPY --from=build /app/build /usr/share/nginx/html

# Configurar NGINX para servir archivos correctamente
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto en el que corre NGINX
EXPOSE 80

# Iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]
