DEV_COMPOSE_FILE=compose.dev.yaml

up:
	docker compose -f $(DEV_COMPOSE_FILE) up --build

down:
	docker compose -f $(DEV_COMPOSE_FILE) down -v

migrate:
	docker compose -f compose.dev.yaml exec server npx prisma migrate dev

# Run even when up, down file exists
.PHONY:
	up down migrate
