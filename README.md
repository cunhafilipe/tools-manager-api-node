## Description

The goal of this test is to develop a REST API in NodeJS with Express to manager tech tools.

These are the endpoints that you should include:

1. Create account;
2. Login;
3. Create tool;
4. List Tools;
5. find tools by key word;

# Getting started (1 min)

Make sure to have docker installed, otherwise [install it here](https://docs.docker.com/get-docker/).

1. Clone the project

```
git clone https://github.com/cunhafilipe/tools-manager-api-node.git
```

2. Fetch dependencies

```
npm install
```

3. Copy the `.env.example` file over to your own `.env` file.

4. Mount docker container and start server

```
docker-compose up
```

5. Running migrations

```
npm prisma:migrate
```

6. Open the Swagger Documentation on http://localhost:3000/docs

7. Run unit tests

```
npm run test
```

8. Run the Server

```
npm run dev
```
