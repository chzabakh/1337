help:
	@echo "help | ls | up | down | delete"

ls:
	docker ps -a
	docker images -a
	docker volume ls
	docker network ls

up:
	docker-compose -f srcs/docker-compose.yml up

down:
	docker-compose -f srcs/docker-compose.yml down

delete: down
	docker rmi -f mymariadb mywordpress mynginx
	docker volume rm srcs_wp_files
	docker volume rm srcs_mdb_files
	docker network rm inception
