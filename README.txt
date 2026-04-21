#creacion del proyecto:
$ npx @nestjs/cli new PetGroomerSystem

#instalacion de npm
npm i

#instalacion typeORM postgrest
npm install --save @nestjs/typeorm typeorm pg reflect-metadata

#instalacion class vlaidator y class trnasformer:
npm i --save class-validator class-transformer reflect-metadata

#Creacion de nueva migracion
cd src/database/migrations
npx typeorm migration:create nombreDelaMigracion

#instalacion api swagger pra documentar:
npm install @nestjs/swagger swagger-ui-express

#levantar docker :
docker-compose up -d

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Create a new migration
npx typeorm migration:create <MigrationName>

# Generate a new migration from schema changes
npm run migration:generate --name <MigrationName>
