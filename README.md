# GiftLink

GiftLink is a full-stack gift discovery app built with Express, React, MongoDB, JWT authentication, Docker, and GitHub Actions.

## Run locally

1. Start MongoDB with `docker compose up mongodb -d`.
2. Install dependencies with `npm install`.
3. Import `data/gifts.json` into the `gifts` collection in the `giftlink` database.
4. Start the server with `npm start`, then open `http://localhost:5000`.

## API

- `GET /api/gifts` lists gifts and supports `?category=`.
- `GET /api/gifts/:id` returns one gift.
- `GET /api/search?q=&category=` searches gifts.
- `POST /api/auth/register` and `POST /api/auth/login` manage accounts.
- `PUT /api/auth/users/:id` updates profile information.
- `POST /api/gifts/:id/comments` adds a comment.

Set `MONGODB_URI`, `MONGODB_DB`, `JWT_SECRET`, and `PORT` through environment variables in production.
