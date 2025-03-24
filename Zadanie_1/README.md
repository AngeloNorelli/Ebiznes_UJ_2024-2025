# Zadanie 1 - Docker z Gradle, Java, Kotlin i SQLite

## Teść polecenia
Zadanie 1 Docker

3.0 obraz ubuntu z Pythonem w wersji 3.10
3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem
4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC
SQLite w ramach projektu na Gradle (build.gradle)
4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji
przez CMD oraz gradle
5.0 dodać konfigurację docker-compose

Obraz należy wysłać na hub.docker.com, a link do obrazu należy dodać w
README na githubie.

## Opis
Ten projekt demonstruje jak zrobić set up zbiornika w Docker zawierjący: 
- system Ubuntu w wersji 24.04
- Python w wersji 3.10
- Java 8
- Kotlin
- Gradle
- SQLite

Projekt zawiera również prostą aplikację HelloWorld napisaną w języku Java wchodzący w interakcję z bazą danych SQLite.

## Struktura projektu

Zadanie_1 <br>
├── [build.gradle](./build.gradle) <br>
├── [Dockerfile](./Dockerfile) <br>
├── [docker-compose.yml](./docker-compose.yml) <br>
├── README.md &nbsp; <- *ten właśnie plik* <br>
└── src <br>
&emsp;&emsp;└── main <br>
&emsp;&emsp;&emsp;&emsp;└── java <br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;└── [HelloWorld.java](./src/main/java/HelloWorld.java)

## Uruchomienie

1. **Stworzenie obrazu w Docker**
    ```sh
    docker-compose build
    ```

2. **Uruchomienie kontenera**
    ```sh
    docker-compose up
    ```

## Linki

* [Obraz dockera](https://hub.docker.com/r/angelonorelli/zadanie_1-app)