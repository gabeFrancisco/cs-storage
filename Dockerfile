# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copia tudo (inclusive o .sln e todos os projetos)
COPY . .

# Instala dotnet-ef
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"

# Restaura a solução inteira
RUN dotnet restore CsStorage.sln

# Publica o projeto da WebAPI (referencia os demais)
RUN dotnet publish CsStorage.Api/CsStorage.Api.csproj -c Release -o /app/publish

# Etapa de runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "CsStorage.Api.dll"]
