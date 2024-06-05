FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /app

# Copiar y restaurar dependencias
COPY api-shifts/*.csproj ./
RUN dotnet restore

# Copiar todo el código
COPY api-shifts/. ./

# Instalar Entity Framework Core tools
RUN dotnet tool install --global dotnet-ef

# Exponer el puerto
EXPOSE 5246

# Ejecutar en modo de desarrollo con hot-reload
ENTRYPOINT ["dotnet", "run", "--project", "api-shifts.csproj", "--urls", "http://0.0.0.0:5246"]