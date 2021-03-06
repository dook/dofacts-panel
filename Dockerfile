FROM node:12.13.0-alpine
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY . /app
RUN yarn
RUN yarn build
RUN yarn global add serve
EXPOSE 5000
ENTRYPOINT ["serve", "-s", "build"]
