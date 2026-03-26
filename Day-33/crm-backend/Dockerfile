# Least change

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY *.csproj .

RUN dotnet restore

COPY . .

RUN dotnet publish -c Release -o /app

# Changes the most

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

WORKDIR /app

ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=true

COPY --from=build /app .

CMD ["dotnet", "/app/crm-backend.dll"]
# ENTRYPOINT ["dotnet", "--version"]