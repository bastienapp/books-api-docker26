# Books API

A small REST API in English using **Node.js**, **Express**, and **PostgreSQL**.

## Requirements

- Node.js 20 or later and npm
- Docker

## 1. Start PostgreSQL

From a terminal:

```bash
docker run -d \
  --name books-postgres \
  -e POSTGRES_USER=books \
  -e POSTGRES_PASSWORD=bookspass \
  -e POSTGRES_DB=booksdb \
  -p 54320:5432 \
  -v books-data:/var/lib/postgresql \
  postgres:18
```
Check that PostgreSQL is ready (repeat if it is still starting):

```bash
docker exec books-postgres pg_isready -U books -d booksdb
```

## 2. Create the table and example books

From this project's root directory:

```bash
docker exec -i books-postgres psql -U books -d booksdb < init.sql
```

## 3. Start the API locally

```bash
npm install
npm start
```

The API listens at `http://localhost:3000`.

## 4. Test the API

List all books:

```bash
curl http://localhost:3000/books
```

## API endpoints

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/books` | List books stored in PostgreSQL |
| POST | `/books` | Add a book with `title` and `author` |

## Stop and restart PostgreSQL

```bash
docker stop books-postgres
docker start books-postgres
```

Remove the container (the `books-data` volume is preserved):

```bash
docker rm -f books-postgres
```

To delete the data permanently, first remove the container, then run:

```bash
docker volume rm books-data
```
