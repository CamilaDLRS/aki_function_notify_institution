FROM mcr.microsoft.com/azure-functions/node:4-node20
WORKDIR /home/site/wwwroot
COPY . .
RUN npm install
ENV AzureWebJobsScriptRoot=/home/site/wwwroot \
    AzureFunctionsJobHost__Logging__Console__IsEnabled=true
