FROM ubuntu:24.04

ENV TZ=Europe/Warsaw

RUN apt-get update && \
    apt-get install -y python3.10 python3-pip openjdk-8-jdk kotlin gradle sqlite-jdbc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN gradle build

CMD ["gradle", "run"]