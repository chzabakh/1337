FROM debian

# Update and Install necessary packages
RUN apt-get upgrade -y && apt-get update
RUN apt-get install -y openssh-server vim net-tools fail2ban portsentry apache2 git

# Add new user with root privileges; -d delete current password; -e force expire password
RUN useradd -ms /bin/bash charaf
RUN usermod -aG sudo charaf

# Change ssh config: port number, root acces
RUN echo "port 1337" >> /etc/ssh/sshd_config
RUN echo "PermitRootLogin no" >> /etc/ssh/sshd_config

# Apache secured
RUN git clone https://github.com/chzabakh/docker_folders
RUN chmod -R 700 /docker_folders
RUN rm /etc/apache2/sites-available/000-default.conf
RUN rm /etc/apache2/sites-available/default-ssl.conf
RUN cp /docker_folders/folders/aph/000-default.conf /etc/apache2/sites-available/000-default.conf
RUN cp /docker_folders/folders/aph/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf

# Apache minigame
RUN rm -rf /var/www/html
RUN git clone https://github.com/chzabakh/docker_bonus /var/www/html
RUN git clone https://github.com/ellisonleao/clumsy-bird /var/www/html/Bird
RUN git clone https://github.com/gabrielecirulli/2048 /var/www/html/2048

# Configuring portsentry
RUN sed -i -e 's/BLOCK_UDP="0"/BLOCK_UDP="1"/g' /etc/portsentry/portsentry.conf
RUN sed -i -e 's/BLOCK_TDP="0"/BLOCK_TDP="1"/g' /etc/portsentry/portsentry.conf
RUN sed -i -e 's/TCP_MODE="tcp"/TCP_MODE="atcp"/g' /etc/default/portsentry
RUN sed -i -e 's/UDP_MODE="udp"/UDP_MODE="audp"/g' /etc/default/portsentry

# Setup fail2ban with the new ssh port
RUN printf "[ssh]\nenabled = true\nport = 1337\nfilter = sshd\nlogpath = /var/log/auth.log\nmaxretry = 3\nbantime = 60\n\n" >> /etc/fail2ban/jail.conf
RUN printf "[apache]\nenabled = true\nport = http,https\nfilter = apache-auth\nlogpath = /var/log/apache2/*error.log\nmaxretry = 10\nbantime = 60\n\n" >> /etc/fail2ban/jail.conf
RUN printf "[http-get-dos]\nenabled = true\nport = http,https\nfilter = http-get-dos\nlogpath = /var/log/apache2/access.log\nmaxretry = 400\nfindtime = 400\nbantime = 60\n" >> /etc/fail2ban/jail.conf
RUN touch /etc/fail2ban/filter.d/http-get-dos.conf
RUN printf "[Definition]\n\nfailregex = ^<HOST> -.*\"(GET|POST).*\n\nignoreregex =" > /etc/fail2ban/filter.d/http-get-dos.conf
RUN sed -i -e 's/port    = ssh/port    = 1337/g' /etc/fail2ban/jail.conf
RUN sed -i -e 's/port     = ssh/port     = 1337/g' /etc/fail2ban/jail.conf
RUN touch /var/log/auth.log

# Starting the services
ENTRYPOINT a2enmod ssl && a2ensite default-ssl && service ssh start && service apache2 start && service fail2ban start && service portsentry start && bash



# Use of the static /30 address 10.12.69.2
#docker network create --subnet=10.12.69.0/30 mynetwork

# Build the image
#docker build -t roger:2 .

# Launch the container with the new created network
#docker run --net mynetwork --ip 10.12.69.2 -it -p 1337:1337 -p 3000:80 -p 4000:443 --rm --name roger roger:2 bash
