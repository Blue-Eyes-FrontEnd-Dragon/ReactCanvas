# Infrastructure
INFRASTRUCTURE_COMPOSE_FILE=docker-compose.yml
DATABASE_COMPOSE_FILE=db/docker-compose.yml

.PHONY: all infra networks

all: networks infra

infra: networks
	docker-compose -f $(DATABASE_COMPOSE_FILE) up --build -d
	docker-compose -f $(INFRASTRUCTURE_COMPOSE_FILE) up --build -d

networks:
	docker network create microservice-network
	docker network create app-network

stop:
	docker-compose -f $(INFRASTRUCTURE_COMPOSE_FILE) down
	docker-compose -f $(DATABASE_COMPOSE_FILE) down
	docker network rm microservice-network || true
	docker network rm app-network || true
