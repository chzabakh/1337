FROM debian:buster
RUN apt update && apt install -y vim mariadb-server mariadb-client
COPY ./database.sql /database.sql
RUN sed -i -e 's/127.0.0.1/0.0.0.0/g' /etc/mysql/mariadb.conf.d/50-server.cnf
RUN service mysql start && mysql -u root < /database.sql
EXPOSE 3306 
#CMD ["mysqld_safe"]
ENTRYPOINT mysqld_safe
