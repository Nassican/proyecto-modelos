FROM mcr.microsoft.com/mssql/server:2022-latest
# Crear un directorio para el script init.sql
WORKDIR /usr/src/app

# Copy initialization scripts
COPY . /usr/src/app

# Establecer las variables de entorno SA_PASSWORD y ACCEPT_EULA
ENV SA_PASSWORD=YourStrong@Passw0rd
ENV ACCEPT_EULA=Y
ENV MSSQL_PID Express


EXPOSE 1433

CMD /bin/bash ./entrypoint.sh