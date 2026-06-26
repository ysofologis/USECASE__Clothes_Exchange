# 👗 ReWear — Community Clothes Exchange

> A hyperlocal platform for swapping, selling, and donating clothes within your community.

---

## 📖 The Business Problem

### Why ReWear?

The fashion industry is one of the most polluting industries in the world:

- **92 million tons** of textile waste are generated globally each year
- The average garment is worn only **7 times** before being discarded
- Fast fashion encourages a "buy-wear-discard" cycle that harms the environment
- Most people have **30% of their wardrobe** they never wear, yet buy new clothes regularly

At the same time, communities have an untapped resource: **clothes sitting in closets** that could be reused, swapped, or donated locally.

### The Solution

ReWear connects people in the same neighborhood to:

1. **Swap** clothes they no longer wear for items from others
2. **Sell** pre-loved items at fair prices
3. **Donate** unwanted clothes to community members in need

This creates a circular economy for fashion that is:

- **Sustainable** — reduces textile waste and carbon footprint
- **Economic** — saves money for users and creates micro-economies
- **Social** — builds community connections and trust
- **Accessible** — anyone can participate, regardless of income

---

## 🎯 Functional Specifications

### Core Features

#### 1. User Authentication & Profiles
- Email/password registration with JWT authentication
- Refresh token rotation for secure sessions
- User profiles with avatar, bio, and location
- Role-based access (User / Admin)

#### 2. Item Listings
- Create listings for clothes to swap, sell, or donate
- Categorization by type, size, brand, condition, season, and gender
- Photo uploads (multiple images per item)
- Search and filter by category, size, price, location, and condition

#### 3. Swap Proposals
- Users can propose swaps with specific items from their closet
- Counter-proposals supported
- Swap status tracking (pending, accepted, declined, completed)
- In-app messaging for negotiation

#### 4. Direct Sales
- Fixed-price listings for selling items
- Purchase flow with order tracking
- Payment integration (ready for Stripe/PayPal)

#### 5. Community Features
- **Feed** — browse recent listings from the community
- **Closet** — view and manage your own listings
- **Impact Dashboard** — track environmental impact (items saved, CO₂ reduced)
- **Saved Items** — bookmark items for later
- **Meetups** — organize local exchange events

#### 6. Communication
- Real-time messaging between users (Socket.IO)
- Conversation threads per swap or sale
- Notification system for swap proposals, messages, and updates

#### 7. Reviews & Trust
- Post-swap reviews and ratings
- User reputation system
- Verified user badges

### User Journey

```
1. Sign up → Create profile
2. Browse feed → Discover items
3. List your own clothes → Upload photos, set details
4. Propose a swap or buy an item
5. Chat with the other party
6. Meet locally → Exchange items
7. Leave a review → Build trust
```

---

## 🛠 Technical Specifications

### Architecture Overview

ReWear follows a **modular monolith** architecture with a clear separation between frontend and backend, designed for future scalability into microservices if needed.

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Angular)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │   Feed   │ │  Closet  │ │  Swap    │ │ Profile  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                    HTTP / WebSocket                      │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Backend (NestJS)                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │  Auth    │ │ Listings │ │  Swaps   │ │  Chat    │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│                    Prisma ORM                            │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL 17 (Docker)                      │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Backend Framework** | NestJS (TypeScript) | Enterprise-grade, modular architecture, built-in DI, excellent TypeScript support, scalable |
| **ORM** | Prisma 6 | Type-safe queries, auto-generated client, excellent migrations, developer experience |
| **Database** | PostgreSQL 17 | ACID compliance, JSON support, full-text search, battle-tested for production |
| **Frontend Framework** | Angular 19 | Strong typing, built-in forms/validation, RxJS for reactive state, enterprise adoption |
| **Styling** | Tailwind CSS | Utility-first, consistent design system, small bundle size, rapid development |
| **Real-time** | Socket.IO | WebSocket abstraction, fallback support, room-based messaging, widely adopted |
| **Authentication** | JWT + Passport | Stateless auth, refresh token rotation, industry standard |
| **Containerization** | Docker Compose | Reproducible environments, easy local development, production-ready |
| **API Documentation** | Swagger/OpenAPI | Auto-generated, interactive docs, client code generation |

### Why This Stack?

#### Backend: NestJS + Prisma + PostgreSQL

- **NestJS** provides a structured, opinionated framework that enforces separation of concerns (controllers, services, modules). This is critical for a project that will grow in complexity.
- **Prisma** eliminates boilerplate SQL, provides compile-time type safety, and makes schema changes painless with migrations. For a community platform where the data model evolves (new features, new relations), this is invaluable.
- **PostgreSQL** is the right choice for a relational platform with complex queries (search, filtering, relationships). It handles JSON for flexible metadata, supports full-text search out of the box, and scales well.

#### Frontend: Angular + Tailwind CSS

- **Angular** is chosen over React/Vue because:
  - Built-in TypeScript support means fewer runtime errors
  - Reactive forms with validation are production-ready out of the box
  - Dependency injection and modular architecture scale well for larger teams
  - Strong typing throughout the stack (frontend + backend both TypeScript)
- **Tailwind CSS** enables rapid UI development with a consistent design system. No CSS-in-JS overhead, predictable utility classes, and easy theming.

#### Real-time: Socket.IO

- Swap negotiations and messages need to be instant. Socket.IO provides:
  - Automatic reconnection and fallback
  - Room-based messaging (one room per conversation)
  - Namespace support for different event types
  - Works behind proxies and firewalls

### Database Schema (13 Models)

| Model | Purpose |
|-------|---------|
| `User` | Registered users with roles and profiles |
| `Item` | Physical clothing items owned by users |
| `Listing` | Public-facing listings (swap/sell/donate) |
| `SwapProposal` | Proposed exchanges between users |
| `SwapProposalItem` | Items involved in a swap proposal |
| `Swap` | Completed or in-progress swaps |
| `Review` | Post-swap ratings and feedback |
| `Conversation` | Message threads between users |
| `ConversationParticipant` | Users in a conversation |
| `Message` | Individual messages in conversations |
| `Notification` | In-app notifications (swap updates, messages) |
| `SavedItem` | Bookmarked items for later |
| `Meetup` | Local exchange events |

### Security

- **JWT authentication** with short-lived access tokens (15 min) and refresh token rotation
- **Password hashing** via bcrypt (10 rounds)
- **Input validation** via class-validator decorators on all DTOs
- **Rate limiting** on authentication endpoints
- **CORS** configured for production domains
- **SQL injection protection** via Prisma parameterized queries

### Development Workflow

```bash
# Start everything (PostgreSQL, backend, frontend)
make dev

# Database operations
make db-migrate    # Apply pending migrations
make db-seed       # Load sample data
make db-reset      # Drop and recreate database

# Testing
make test          # Run all tests
make lint          # Lint code

# Production build
make build         # Build backend + frontend
```

---

## 🚀 Getting Started

### Prerequisites

- **Docker & Docker Compose** — for running PostgreSQL and containerized services
- **Node.js 20+** — for local development (optional, Docker is sufficient)
- **Make** — for convenience commands (optional)

### Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd clothes_exchange

# Start all services
make dev

# Or without Make:
docker-compose up -d
```

### Development URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:4200 |
| Backend API | http://localhost:3000 |
| API Docs (Swagger) | http://localhost:3000/api |
| pgAdmin | http://localhost:5050 |

### Database Management

```bash
make db-reset          # Reset database and run migrations
make db-seed           # Seed with sample data (4 users, 7 items, etc.)
make db-migrate        # Run pending migrations
```

### Testing

```bash
make test              # Run all tests
make test-backend      # Run backend tests only
make test-frontend     # Run frontend tests only
make lint              # Run linter
```

---

## 📁 Project Structure

```
clothes_exchange/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── modules/            # Feature modules
│   │   │   ├── auth/           # Authentication (JWT, local)
│   │   │   ├── health/         # Health check endpoint
│   │   │   └── prisma/         # Prisma service
│   │   ├── common/             # Shared utilities
│   │   └── main.ts             # Application entry point
│   ├── prisma/
│   │   ├── schema.prisma       # Database schema
│   │   └── seed.ts             # Sample data
│   ├── test/                   # Backend tests
│   └── Dockerfile
├── frontend/                   # Angular app
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/           # Singleton services (auth, interceptors)
│   │   │   ├── features/       # Lazy-loaded feature modules
│   │   │   │   ├── auth/       # Login, register
│   │   │   │   ├── chat/       # Real-time messaging
│   │   │   │   ├── closet/     # User's listings
│   │   │   │   ├── feed/       # Community feed
│   │   │   │   ├── impact/     # Environmental impact dashboard
│   │   │   │   ├── listings/   # Browse/search listings
│   │   │   │   ├── profile/    # User profiles
│   │   │   │   └── swap/       # Swap management
│   │   │   ├── shared/         # Reusable components
│   │   │   └── layout/         # Shell components (navbar)
│   │   └── main.ts
│   └── Dockerfile
├── docker-compose.yml          # Service orchestration
├── Makefile                    # Development commands
├── .gitignore
├── LICENSE
└── README.md
```

---

## 📡 API Documentation

API documentation is auto-generated via **Swagger** and available at `/api` when the backend is running.

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login and receive JWT |
| POST | `/auth/refresh` | Refresh access token |
| POST | `/auth/logout` | Revoke refresh token |
| GET | `/auth/me` | Get current user profile |

Full API documentation is available at `http://localhost:3000/api` when running locally.

---

## 🧪 Testing

```bash
# Run all tests
make test

# Run backend tests only
make test-backend

# Run frontend tests only
make test-frontend
```

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Support

For questions, feature requests, or issues:

- Open an issue on GitHub
- Reach out to the maintainers

---

*Built with ❤️ for a more sustainable fashion future.*
