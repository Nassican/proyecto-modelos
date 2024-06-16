# Proyecto modelos Turnos EPS

- Frontend hecho en NextJS, puerto 3000
- Backend hecho en .NET, puerto 5000
- Base de datos en PostgreSQL, el archivo que se inicializara es con el init.sql

| Elemento | Tecnologia | Comentario |
| ---         |     ---      |          --- |
| Frontend   | NextJS     | Puerto 5000    |
| Backend     | .NET       | Puerto 8080      |
| Base de datos     | PostgreSQL       | Script init.sql      |

# Estructura del proyecto

```
my-project/ 
├── backend/ 
│   ├── MyBackend/
│   │   ├── Controllers/
│   │   ├── Models/
│   │   ├── Program.cs
│   │   ├── Startup.cs
│   │   └── MyBackend.csproj
│   └── Dockerfile
├── frontend/
│   ├── pages/
│   ├── public/
│   ├── styles/
│   ├── next.config.js
│   └── package.json
├── database/
│   ├── init.sql
├── .env
└── docker-compose.yml
```
