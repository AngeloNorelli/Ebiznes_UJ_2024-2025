# Zadanie 1 - Docker z Gradle, Java, Kotlin i SQLite

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
├── [README.md](./README.md) <br>
└── src <br>
&emsp;└── main <br>
&emsp;&emsp;└── java <br>
&emsp;&emsp;&emsp;└── [HelloWorld.java](./src/main/java/HelloWorld.java)