FROM ruby:2.6.4
RUN apt-get update && apt-get install -y sqlite3 nodejs build-essential git
ONBUILD RUN git clone https://github.com/chzabakh/ruby_app /opt/app
ONBUILD WORKDIR /opt/app
ONBUILD RUN bundle install
ONBUILD RUN rake db:migrate
ONBUILD RUN rake db:seed


#first build image: docker build -t ft-rails:on-build .

#second build exercice dockerfile

#and last launch image docker run --rm -it -p 3000:3000 <imageid>
