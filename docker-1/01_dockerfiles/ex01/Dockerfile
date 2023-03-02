FROM debian
RUN apt-get update && apt-get install -y vim lbzip2 wget
RUN wget https://files.teamspeak-services.com/releases/server/3.9.1/teamspeak3-server_linux_amd64-3.9.1.tar.bz2
RUN tar -xf teamspeak3-server_linux_amd64-3.9.1.tar.bz2
CMD sh teamspeak3-server_linux_amd64/ts3server_minimal_runscript.sh
#docker run -it -e TS3SERVER_LICENSE=accept -p 9987:9987/udp -p 10011:10011 -p 30033:30033 --expose 30033 --name vm <ImageId>
