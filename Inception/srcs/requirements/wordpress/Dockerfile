FROM debian:buster
RUN apt update && apt install -y wget php-fpm php-common php-mysql php-cgi php-mbstring php-curl php-gd php-xml php-xmlrpc php-pear
COPY ./conf/www.conf /etc/php/7.3/fpm/pool.d/www.conf
RUN wget https://wordpress.org/latest.tar.gz && tar -xzf latest.tar.gz
RUN mkdir /var/www
RUN mv wordpress /var/www/html
RUN mv /var/www/html/wp-config-sample.php /var/www/html/wp-config.php
RUN chown -R www-data:www-data /var/www/html/
RUN chmod -R 755 /var/www/html/
RUN mkdir /run/php
EXPOSE 9000
ENTRYPOINT sed -i -e "s/database_name_here/${WORDPRESS_DB_NAME}/g" /var/www/html/wp-config.php && sed -i -e "s/username_here/${WORDPRESS_DB_USER}/g" /var/www/html/wp-config.php && sed -i -e "s/localhost/${WORDPRESS_DB_HOST}/g" /var/www/html/wp-config.php && sed -i -e "s/password_here/${WORDPRESS_DB_PASSWORD}/g" /var/www/html/wp-config.php && /usr/sbin/php-fpm7.3 -F
