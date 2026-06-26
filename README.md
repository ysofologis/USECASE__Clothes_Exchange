# 👗 Rewear — Community Clothes Exchange

A hyperlocal platform for swapping, selling, and donating clothes within your community.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS (TypeScript) |
| ORM | Prisma |
| Database | PostgreSQL |
| Frontend | Angular 17+ |
| Styling | Tailwind CSS |
| Real-time | Socket.IO (WebSockets) |
| Containerization | Docker Compose |

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 20+ (for local development)
- Make (optional, for convenience commands)

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

### Database

```bash
make db-reset          # Reset database and run migrations
make db-seed           # Seed with sample data
make db-migrate        # Run pending migrations
```

### Testing

```bash
make test              # Run all tests
make test-backend      # Run backend tests only
make test-frontend     # Run frontend tests only
make lint              # Run linter
```

## Project Structure

```
clothes_exchange/
├── backend/                # NestJS API
│   ├── src/
│   │   ├── modules/        # Feature modules
│   │   ├── common/         # Shared utilities
│   │   └── main.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── test/
│   └── Dockerfile
├── frontend/               # Angular app
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/       # Singleton services
│   │   │   ├── features/   # Lazy-loaded modules
│   │   │   ├── shared/     # Reusable components
│   │   │   └── layout/     # Shell components
│   │   └── main.ts
│   └── Dockerfile
├── docker-compose.yml
├── Makefile
├── .github/
│   └── workflows/
│       └── ci.yml
├── .gitignore
├── LICENSE
└── README.md
```

## API Documentation

API documentation is auto-generated via Swagger and available at `/api` when the backend is running.

## License

MIT License — see [LICENSE](LICENSE) for details.
