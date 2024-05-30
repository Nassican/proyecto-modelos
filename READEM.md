# Proyecto modelos Turnos EPS

- Frontend hecho en NextJS, puerto 3000
- Backend hecho en .NET, puerto 5000
- Base de datos en PostgreSQL, el archivo que se inicializara es con el init.sql

| Elemento | Tecnologia | Comentario |
| ---         |     ---      |          --- |
| Frontend   | NextJS     | Puerto 3000    |
| Backend     | .NET       | Puerto 5000      |
| Base de datos     | PostgreSQL       | Script init.sql      |

# Estructura del proyecto

<p>
my-project/ <br>
├── backend/ <br>
│   ├── MyBackend/<br>
│   │   ├── Controllers/<br>
│   │   ├── Models/<br>
│   │   ├── Program.cs<br>
│   │   ├── Startup.cs<br>
│   │   └── MyBackend.csproj<br>
│   └── Dockerfile<br>
├── frontend/<br>
│   ├── pages/<br>
│   ├── public/<br>
│   ├── styles/<br>
│   ├── next.config.js<br>
│   └── package.json<br>
├── database/<br>
│   ├── init.sql<br>
├── .env<br>
└── docker-compose.yml<br>
</p>