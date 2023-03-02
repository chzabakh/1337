FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
RUN ln -fs /usr/share/zoneinfo/Africa/Casablanca /etc/localtime
RUN apt-get update && apt-get install -y curl openssh-server ca-certificates vim git tzdata postfix
RUN dpkg-reconfigure --frontend noninteractive tzdata
RUN curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh | bash
RUN apt-get install gitlab-ce
RUN git clone https://github.com/chzabakh/docker_folders
RUN printf "nginx['redirect_http_to_https'] = true\n" >> /etc/gitlab/gitlab.rb
RUN printf "nginx['ssl_certificate'] = \"/docker_folders/folders/ssl/server.crt\"\n" >> /etc/gitlab/gitlab.rb
RUN printf "nginx['ssl_certificate_key'] = \"/docker_folders/folders/ssl/server.key\"\n" >> /etc/gitlab/gitlab.rb
RUN sed -i -e 's/http:\/\/gitlab.example.com/https:\/\/192.168.99.100/g' /etc/gitlab/gitlab.rb
RUN sed -i -e 's/#   Port 22/    Port 1337/g' /etc/ssh/ssh_config
RUN printf "gitlab_rails['gitlab_shell_ssh_port'] = 1337" >> /etc/gitlab/gitlab.rb
ENTRYPOINT service ssh start && service postfix start && (/opt/gitlab/embedded/bin/runsvdir-start&) && gitlab-ctl reconfigure && gitlab-ctl tail && bash


#docker-machine create -d virtualbox --virtualbox-memory 2048 default

#docker run -it --rm -p 80:80 -p 443:443 -p 1337:22 <image_id> bash
