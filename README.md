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

Para desplegar el proyecto con docker-compose, primero hay que hacer una copia del .env.local que está en el frontend y cambiarle el nombre a .env, y el .env.examole que está en la carpeta raíz, también hacer una copia y cambiarle el nombre a .env, después hacer el siguiente comando y esperar a que los servicios estén creados:
```
docker-compose up --build
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
