# Hessy E-commerce Platform

A modern, scalable e-commerce platform built with Node.js, TypeScript, GraphQL, PostgreSQL, and Next.js.

## Features

- 🛍️ **Product Management**: Full product catalog with variants and inventory tracking
- 💳 **Payment Processing**: Stripe integration for secure payments
- 📊 **Analytics**: Custom event tracking and reporting
- 🧪 **A/B Testing**: Built-in experimentation framework
- 📝 **CMS**: Flexible content management for pages
- 🎨 **Themeable Frontend**: Swappable UI themes
- 🐳 **Docker Support**: Complete containerized development environment

## Tech Stack

### Backend
- **Runtime**: Node.js 20
- **Language**: TypeScript
- **API**: GraphQL (Apollo Server)
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **ORM**: TypeORM
- **Payments**: Stripe

### Frontend
- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **GraphQL Client**: Apollo Client
- **Animations**: Framer Motion

## Quick Start

### Prerequisites
- Docker and Docker Compose
- Node.js 20+ (for local development)
- Stripe account (for payments)

### 1. Clone and Setup

```bash
cd hessy
cp .env.example .env
```

### 2. Configure Environment

Edit `.env` and add your Stripe API keys:
```bash
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

### 3. Start with Docker

```bash
docker-compose up
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- Backend GraphQL API on port 4000
- Frontend Next.js app on port 3000

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **GraphQL Playground**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health

## Project Structure

```
hessy/
├── backend/
│   ├── src/
│   │   ├── database/        # Database config and migrations
│   │   ├── entities/        # TypeORM entities
│   │   ├── graphql/         # GraphQL schema and resolvers
│   │   ├── services/        # Business logic services
│   │   └── utils/           # Utilities
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── pages/           # Next.js pages
│   │   ├── components/      # React components
│   │   ├── lib/             # Apollo Client config
│   │   ├── theme/           # Theme system
│   │   └── styles/          # Global styles
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml
```

## Development

### Backend Development

```bash
cd backend
npm install
npm run dev
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

### Database Migrations

```bash
cd backend
npm run migration:generate -- -n MigrationName
npm run migration:run
```

## API Documentation

The GraphQL API provides the following main features:

### Products
- Query products by category, status
- Create, update, delete products
- Manage product variants
- Track inventory

### Orders
- Create orders with inventory reservation
- Update order status
- View order history

### Payments
- Create Stripe payment intents
- Confirm payments
- Track payment status

### CMS
- Create and manage pages
- Publish/unpublish content
- Dynamic page rendering

### Analytics
- Track custom events
- Generate reports
- Group by time or event type

### A/B Testing
- Create and manage tests
- Assign users to variants
- Track test results

## Theming

The frontend supports swappable themes. To switch themes:

```typescript
import { useTheme } from '@/theme/ThemeProvider';

function MyComponent() {
  const { setTheme } = useTheme();
  
  return (
    <button onClick={() => setTheme('luxury')}>
      Switch to Luxury Theme
    </button>
  );
}
```

## License

MIT