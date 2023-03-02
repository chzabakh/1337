FROM debian:buster
COPY ./conf/nginx.conf /etc/nginx/conf.d/nginx.conf
RUN apt update && apt install -y vim nginx openssl
RUN openssl req -x509 -nodes -days 365 -newkey rsa:2048 -sha256 -out /etc/nginx/server.crt -keyout /etc/nginx/server.key -subj "/C=PE/ST=Lima/L=Lima/O=Acme Inc. /OU=IT Department/CN=acme.com"
EXPOSE 443
ENTRYPOINT ["nginx", "-g", "daemon off;"]
#ENTRYPOINT nginx -g daemon off;
