# Mini Order Flow System - Full Stack

This is a complete Mini Order Flow System with backend (NestJS), frontend (Next.js), Redis OTP login, MySQL + Kafka orders.

## Repo Structure

```
mini-order-flow/
├─ backend-nestjs/
├─ frontend-nextjs/
├─ docker-compose.yml
├─ package.json      <- Run both frontend and backend together
├─ order_summary.php
├─ README.md
```

## Prerequisites

- Node.js 20+
- Docker & Docker Compose
- PHP (For PHP integration part)

## Setup Instructions

1. Clone repo:

```bash
git clone https://github.com/RajneeshOjha0/Mini-Order-Flow-System.git
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


PHP Integration for Order Summary

- To view order details using PHP integration:

1. Setup PHP Environment:

Follow the steps below to run the PHP order_summary page:

a. Download and Install XAMPP/MAMP/WAMP:

To run PHP locally, you need a local server environment such as XAMPP.

After installation, ensure that the Apache server is running.

b. Move PHP Files to Web Directory:

Move the PHP files (e.g., order_summary.php) into the htdocs folder for XAMPP.

For example:

XAMPP: C:\xampp\htdocs\order_summary.php

c. Start Apache Server:

Open your XAMPP control panel.

Start Apache .

1. Open PHP Order Summary Page:

To view the order summary:

Open your browser and visit the URL:

XAMPP/ (local server): http://localhost/order_summary.php?order_id=123

Replace 123 with the actual order_id you want to view. copy order id form next.js app

The PHP script will fetch order details from the NestJS backend API and display them on the page.

Ensure that your NestJS API is running and that the order_id exists in your database.

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
