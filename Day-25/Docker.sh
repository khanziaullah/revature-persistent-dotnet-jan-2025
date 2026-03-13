
docker run -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD="p@ssw0rd" -p 1433:1433 -v crm_sql_volume:/var/opt/mssql --name sqlserver2019 -d mcr.microsoft.com/mssql/server:2019-latest
docker run -d -p 8500:8500 -p 8600:8600/udp  --name consul  hashicorp/consul agent -dev -client=0.0.0.0