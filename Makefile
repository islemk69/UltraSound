all:
	docker compose up -d --build

up: 
	docker compose up -d --build

down:
	docker compose down

clean:
	docker compose down
	docker system prune --all