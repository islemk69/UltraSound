all:
	docker compose up --build

clean:
	docker compose down
	docker compose prune --all