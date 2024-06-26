# Proyecto modelos Turnos EPS

- Frontend hecho en NextJS, puerto 5000
- Backend hecho en .NET, puerto 8080
- Base de datos en PostgreSQL, el archivo que se inicializara es con el init.sql
- External Api en Express, puerto 3000
- WebSocket Server, puerto 3002

| Elemento | Tecnologia | Comentario |
| ---         |     ---      |          --- |
| Frontend   | NextJS     | Puerto 5000    |
| Backend     | .NET       | Puerto 8080      |
| Base de datos     | PostgreSQL       | Script init.sql      |

Para desplegar el proyecto con docker-compose, primero hay que hacer una copia del .env.local.example que está en la carpeta frontend y cambiarle el nombre a .env, y el .env.example que está en la carpeta raíz, también hacer una copia y cambiarle el nombre a .env, después hacer el siguiente comando y esperar a que los servicios estén creados:
```
docker-compose up --build
```
Después de que los servicios estén creados ir a la ruta de la api:
```
localhost:8080/swagger/index.html
```
En esta ruta ir al endpoint Register ("api/Account/Register") y crear un usuario (username, password, email) para poder acceder al sistema.

Después de haber creado un usuario puedes usar el sistema.

```
localhost:5000
```

Para ver los turnos en vivo, la ruta es:
```
localhost:5000/tv2
```

# Estructura del proyecto

```
my-project/ 
├── backend/ 
│   ├── MyBackend/
│   └── Dockerfile
├── frontend/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── next.config.js
│   ├── package.json
│   ├── Dockerfile
│   ├── .env
├── database/
│   ├── init.sql
├── external-api/
│   ├── Dockerfile
├── socketServer/
│   ├── init.sql
│   ├── Dockerfile
├── .env
└── docker-compose.yml
```
