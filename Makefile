# Rewear — Makefile
# Development convenience commands

.PHONY: dev dev-down db-reset db-seed db-migrate test lint

# ─── Development ────────────────────────────────────────

dev:
	docker-compose up -d
	@echo "✅ All services started!"
	@echo "   Frontend: http://localhost:4200"
	@echo "   Backend:  http://localhost:3000"
	@echo "   API Docs: http://localhost:3000/api"
	@echo "   pgAdmin:  http://localhost:5050"

dev-build:
	docker-compose up -d --build

dev-down:
	docker-compose down

dev-logs:
	docker-compose logs -f

# ─── Database ───────────────────────────────────────────

db-migrate:
	cd backend && npx prisma migrate dev

db-seed:
	cd backend && npx prisma db seed

db-reset:
	cd backend && npx prisma migrate reset --force
	cd backend && npx prisma db seed
	@echo "✅ Database reset and seeded!"

db-studio:
	cd backend && npx prisma studio

# ─── Testing ────────────────────────────────────────────

test:
	cd backend && npm test
	cd frontend && npm test -- --watch=false

test-backend:
	cd backend && npm test

test-frontend:
	cd frontend && npm test -- --watch=false

# ─── Linting ────────────────────────────────────────────

lint:
	cd backend && npm run lint
	cd frontend && npx ng lint

# ─── Build ──────────────────────────────────────────────

build:
	cd backend && npm run build
	cd frontend && npx ng build

# ─── Install ────────────────────────────────────────────

install:
	cd backend && npm install
	cd frontend && npm install
