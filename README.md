<h1 align="center"> 
	API Rest NodeJs com SOLID
</h1>
<p align="center">
 <a href="#-sobre-o-projeto"> • Sobre</a> 
 <a href="#-tecnologias"> • Tecnologias</a> 
</p>

## 💻 Sobre o projeto

Este desafio visa desenvolver uma aplicação para cadastro de pets em ORGS, utilizando uma série de tecnologias e conceitos avançados. Foi de grande aprendizado colocar meus conhecimentos em prática, já que o projeto passado foi feito com acompanhamento, esse foi do total 0 feito por mim.

Na primeira etapa do projeto, são configuradas variáveis de ambiente para o banco de dados postgreSQL, utilizando o arquivo .env e o Prisma como ORM. Essas variáveis armazenam informações sensíveis, como credenciais de banco de dados, e ajudam a configurar o projeto de acordo com diferentes ambientes, como desenvolvimento ou produção.

Na segunda parte, é apresentada a arquitetura do projeto, com destaque para a integração da biblioteca Vitest para testes e cobertura de testes. Isso inclui a instalação de dependências, configuração de arquivos e a adição de scripts no package.json para executar testes e outras tarefas relacionadas.

A aplicação é desenvolvida com testes unitários de integração e testes end-to-end (e2e), alcançando uma cobertura de testes completa de 100%. Além disso, são utilizados os GitHub Actions para automatizar a execução dos testes e verificar a cobertura de código a cada push na branch principal.

Por fim, são apresentadas diversas funcionalidades adicionais e bibliotecas utilizadas no projeto, como bcryptjs para criptografia de senhas e dayjs para manipulação de datas. O projeto também inclui uma lista detalhada de requisitos funcionais e não funcionais, juntamente com regras de negócio que guiam o desenvolvimento das funcionalidades da aplicação.

Em resumo, este projeto oferece uma base sólida e bem estruturada para o desenvolvimento de aplicações web escaláveis e de alta qualidade, incluindo configurações e ferramentas para garantir a qualidade do código e facilitar a manutenção ao longo do tempo.

&nbsp;

<a id="-tecnologias"></a>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto

&nbsp;

<p align="center">
  <!-- <a href= ""><img alt="" src="https://img.shields.io/static/v1?logoWidth=15&logoColor=ECD53F&logo=.ENV&label=Managing Environment Variables&message=.ENV&color=ECD53F"></a> -->
  <a href= "https://nodejs.org/en/" target="_blank" rel="noopener noreferrer"><img alt="Node.js badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/2467074c4c912dd04b12bcee1076cb5ca7ba9eaf/files/nodejs-badge.svg"></a>
  <a href= "https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/2467074c4c912dd04b12bcee1076cb5ca7ba9eaf/files/typescript-badge.svg"></a>
  <a href= "https://www.javascript.com/" target="_blank" rel="noopener noreferrer"><img alt="JavaScript badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/2467074c4c912dd04b12bcee1076cb5ca7ba9eaf/files/javascript-badge.svg"></a>
  <a href= "https://www.fastify.io/" target="_blank" rel="noopener noreferrer"><img alt="Fastify badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/2467074c4c912dd04b12bcee1076cb5ca7ba9eaf/files/fastify-badge.svg"></a>
  <a href= "https://www.dotenv.org/" target="_blank" rel="noopener noreferrer"><img alt="Dotenv badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/4eed338fdcd547570ed365f2b344e43c8202e88f/files/dotenv-badge.svg"></a>
  <a href= "https://www.prisma.io/"><img alt="Prisma badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/ef5ebd0021ccb0a8d244f5636b2b238ab0af09e7/files/prisma-badge.svg"></a>
  <a href= "https://zod.dev/" target="_blank" rel="noopener noreferrer"><img alt="ZOD badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/7caba2f743ee9b61f0225a22da57466ecb67097c/files/zod-badge.svg"></a>
  <a href= "https://www.docker.com/"><img alt="Docker badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/d7f6873e652db237a89583607eb70757ebaaa6d1/files/docker-badge.svg"></a>
  <a href= "https://vitest.dev/"><img alt="Vitest Badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/28993b470420f2c44db532b4e6e662e60a186954/files/vitest-badge.svg"></a>
  <a href= "https://swagger.io/"><img alt="swagger badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/e8e5c3d2752ae17cbffa11142d8513fe1f405873/files/swagger-badge.svg"></a>
  <a href= "https://jwt.io/"><img alt="JSON Web Tokens Badge" src="https://raw.githubusercontent.com/LivioAlvarenga/LivioAlvarenga/af3b694b2d536d66113468df616d3f165d881eb7/files/jwt-badge.svg"></a>

## ⚙️ Instalações

&nbsp;

### Criando **projeto NodeJs**

```bash
# Create project nodejs with npm and -y to accept all default options
npm init -y
```

```json
// Create scripts package.json
"scripts": {
  "dev": "set NODE_ENV=dev&& tsx watch src/server.ts", // Create script to run server in development mode
  "build": "tsup src !src/**/*.spec.ts !src/**/test/**/* --out-dir build --minify --publicDir src/docs", // Create script to build server in production mode
  "start": "set NODE_ENV=production&& node build/server.js", // Create script to run server in production mode
},
```

&nbsp;

### **TypeScript** architecture

```bash
npm install -D typescript # Install TypeScript
npm install -D @types/node # Install @types/node to use types in NodeJs
npm install -D tsx # Install tsx to use compiler TypeScript in NodeJs in development mode
npm install -D tsup # Install tsup to use compiler TypeScript in NodeJs in production mode
npm install zod # Install zod to use types in NodeJs and validate data
npx tsc --init # Create tsconfig.json
```

```json
"target": "es2020", // Change TypeScript target to ES2020 in tsconfig.json
"baseUrl": "./", // Specify the base directory to resolve non-relative module names.
"paths": {
  "@/*": [
    "./src/*"
  ],
} // Specify path aliases to import files in tsconfig.json
```

&nbsp;

### **Fastify** architecture

```bash
npm install fastify # Install Fastify
npm install @fastify/jwt # Install @fastify/jwt to use JWT in Fastify
npm install @fastify/cookie # Install @fastify/cookie to use cookie in Fastify

```

_Create **`fastify-jwt.d.ts`** file in @types folder with all types of JWT in Fastify_

```typescript
import "@fastify/jwt";

declare module "@fastify/jwt" {
  export interface FastifyJWT {
    user: {
      sub: string;
    };
  }
}
```

_Create **`JWT_SECRET`** in .env and .env.example_

```.env
# Auth token in development mode
JWT_SECRET="secret"
```

_Create script **`fastifyJwt`** in app.ts to use JWT in Fastify_

```typescript
app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});
```

```bash
# Command to run postgres image database without docker-compose. This image is from bitnami (https://hub.docker.com/r/bitnami/postgresql)
docker run --name api-solid-pg -e POSTGRESQL_USERNAME=docker -e POSTGRESQL_PASSWORD=docker -e POSTGRESQL_DATABASE=apisolid -p 5432:5432 bitnami/postgresql
# We don't use this command because we use docker-compose to run all images, this command is just to show how to run a single image
```

```json
// Create scripts in package.json
"scripts": {
  "start-docker": "docker-compose up -d", // Create script to run docker-compose in background
  "stop-docker": "docker-compose stop" // Create script to stop docker-compose
},
```

&nbsp;

### **Vitest** architecture

```bash
npm install -D vitest # Install Vitest
npm install -D vite-tsconfig-paths # To vite understand tsconfig paths
npm install -D @vitest/coverage-c8 # Install coverage vitest
npm install -D @vitest/ui # Install vitest ui
npm install -D supertest # Install supertest to test http requests
npm install -D @types/supertest # Install types supertest
```

_Create **`vite.config.ts`** file with all vitest config_

```typescript
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
});
// now vitest can understand tsconfig paths
```

```json
// Create scripts in package.json
"scripts": {
  "dev": "tsx watch src/server.ts", // Run server
  "test:create-prisma-environment": "npm link ./prisma/vitest-environment-prisma", // Create vitest-environment-prisma in node_modules
  "test:install-prisma-environment": "npm link vitest-environment-prisma", // Install vitest-environment-prisma in node_modules
  "test": "vitest run --dir src/useCases", // Run all tests without watch
  "pretest:e2e": "run-s test:create-prisma-environment test:install-prisma-environment", // Run before test:e2e, run-s is to run scripts in sequence (npm install -D npm-run-all)
  "test:e2e": "vitest run --dir src/http", // Run all tests without watch in specific folder
  "test:e2e:watch": "vitest --dir src/http", // Run all tests with watch in specific folder
},
```

_Create **`vitest-environment-prisma`** to test environment with prisma_

```bash
cd prisma/vitest-environment-prisma # Enter in vitest-environment-prisma folder
npm init -y # Create package.json
npm link # Link vitest-environment-prisma to node_modules
cd ../../ # Return to root folder
npm link vitest-environment-prisma # Link vitest-environment-prisma to node_modules
```

Edit **`package.json`** file like this

```json
{
  "name": "vitest-environment-prisma",
  "main": "prisma-test-environment.ts"
}
```

_Create **`prisma-test-environment.ts`** in vitest-environment-prisma folder_

_Edit **`vite.config.ts`** file with all vitest config_

```typescript
// Any test inside src/http/controllers will run in environment with prisma/vitest-environment-prisma
test: {
  environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
},
```

&nbsp;

### **Others** libraries

```bash
npm install -D npm-run-all # Install npm-run-all to run multiple scripts in parallel or sequential
npm install bcryptjs # Install bcryptjs to encrypt password
npm install -D @types/bcryptjs # Install typescript types for bcryptjs
npm install dayjs # Install dayjs to manipulate date
```

---

&nbsp;

### **How to start the project**

```bash
git clone https://github.com/devgiovannimota/FindAFriend-Api-restful-solid.git # Clone the project in your local repository
npm i # Install all dependencies
docker compose up -d # Start the container image with compose
npm run dev # Run the project
```


### Regras da aplicação

[x] - Deve ser possível cadastrar um pet
[x] - Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
[x] - Deve ser possível filtrar pets por suas características
[x] - Deve ser possível visualizar detalhes de um pet para adoção
[x] - Deve ser possível se cadastrar como uma ORG
[x] - Deve ser possível realizar login como uma ORG

### Regras de negócio

[x] - Para listar os pets, obrigatoriamente precisamos informar a cidade
[x] - Uma ORG precisa ter um endereço e um número de WhatsApp
[x] - Um pet deve estar ligado a uma ORG
[x] - O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
[x] - Todos os filtros, além da cidade, são opcionais
[x] - Para uma ORG acessar a aplicação como admin, ela precisa estar logada
