# Mini Order Flow System - Full Stack

This is a complete Mini Order Flow System with backend (NestJS), frontend (Next.js), Redis OTP login, MySQL + Kafka orders.

## Repo Structure

```
mini-order-flow/
├─ backend-nestjs/
├─ frontend-nextjs/
├─ docker-compose.yml
├─ package.json      <- Run both frontend and backend together
├─ README.md
```

## Prerequisites

- Node.js 20+
- Docker & Docker Compose

## Setup Instructions

1. Clone repo:

```bash
git clone <[repo_url](https://github.com/RajneeshOjha0/Mini-Order-Flow-System.git)>
cd Mini-Order-Flow-System
```

2. Copy environment files:

```bash
cp backend-nestjs/.env.example backend-nestjs/.env
```

3. Start infrastructure (Redis, MySQL, Kafka, Zookeeper):

```bash
docker-compose up -d
```

4. Install dependencies:

```bash
npm install
cd backend-nestjs
npm install
cd ../frontend-nextjs
npm install
cd ..
npm install -D concurrently
```

5. Start both frontend and backend together:

```bash
npm run dev
```

- Backend: http://localhost:6001
- Frontend: http://localhost:3001 (Next.js default)

---

## How it works

- **Login OTP**: POST `/auth/request-otp` → check backend console → POST `/auth/verify-otp` → get JWT token.
- **Orders**: POST `/orders` (with token) to create, GET `/orders` to list.
- **Kafka** logs new orders to topic `orders_log`.

---

## Notes

- OTP is simulated; users need to check backend console to see the OTP.  
- JWT token must be used in the `Authorization` header (`Bearer <token>`) for order APIs.  
- Kafka logs can be viewed using Kafka tools or console consumer.  
- Frontend pages:
  - `/` → Login with OTP
  - `/orders` → Create orders and view history
