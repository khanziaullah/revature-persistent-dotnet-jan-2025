Projects-
1 - WebAPI - Customer/Quotation

dotnet run

Browser: https://localhost:5001/api/v1/customer


dotnet run --urls=https://localhost:5001/
dotnet run --urls=https://localhost:5002/
dotnet run --urls=https://localhost:5003/
dotnet run --urls=https://localhost:5004/


Project
2 - WebAPI - Controllers - Don't add controllers to this
add package YARP.ReverseProxy

dotnet run --urls=http://localhost:5000/


Browser: https://localhost:5000/api/v1/customer -> Without transform
Browser: https://localhost:5000/customer -> With Transfer remove part appending part of URL

program.cs

builder.MapReverseProxy();

appsettings.json

"ReverseProxy":
{
    service:
        match
            path: "{**Match-all}

            Transform
                remove -> customer
                append -> api/v1/customer
    route:
}