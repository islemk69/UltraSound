all:
	docker compose up --build

up: 
	docker compose up --build

down:
	docker compose down

clean:
	docker compose down
	docker system prune --all