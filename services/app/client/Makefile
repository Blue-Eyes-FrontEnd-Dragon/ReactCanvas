.PHONY: networks client stop

client: networks
	yarn install
	docker-compose -f docker-compose.yml up --build -d

networks:
	docker network create microservice-network
	docker network create app-network

stop:
	docker-compose -f docker-compose.yml down
	docker network rm microservice-network || true
	docker network rm app-network || true