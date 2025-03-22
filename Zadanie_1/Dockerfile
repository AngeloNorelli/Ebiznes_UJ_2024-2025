FROM ubuntu:24.04

ENV TZ=Europe/Warsaw
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y software-properties-common wget unzip && \
    add-apt-repository ppa:openjdk-r/ppa && \
    apt-get update && \
    apt-get install -y python3.10 python3-pip openjdk-8-jdk kotlin sqlite3 libsqlite3-dev && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN wget https://services.gradle.org/distributions/gradle-4.10.3-bin.zip -P /tmp && \
    unzip /tmp/gradle-4.10.3-bin.zip -d /opt && \
    ln -s /opt/gradle-4.10.3/bin/gradle /usr/bin/gradle

RUN update-alternatives --set java /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java && \
    update-alternatives --set javac /usr/lib/jvm/java-8-openjdk-amd64/bin/javac

RUN mkdir -p /app
WORKDIR /app

COPY . .

RUN gradle build

CMD ["gradle", "run"]