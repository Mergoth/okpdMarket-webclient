# To build and run with Docker:
#  $ docker build -t webclient .
#  $ docker run -d -p 4200:4200 -p 49152:49152 -it webclient
#
FROM node:6

RUN useradd --user-group --create-home --shell /bin/false app

ENV APP_NAME "webclient"
ENV APP_USER "app"
ENV HOME /home/$APP_USER
ENV APP_DIR $HOME/$APP_NAME

RUN npm install --global angular-cli

WORKDIR $APP_DIR
COPY package.json $APP_DIR/package.json
RUN npm install && npm cache clean
COPY . $APP_DIR
RUN chown -R $APP_USER:$APP_USER $HOME/*

USER $APP_USER
WORKDIR $APP_DIR

EXPOSE 4200 49152

CMD ng serve --host 0.0.0.0 --prod