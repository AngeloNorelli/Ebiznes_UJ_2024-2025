# Ebiznes 2024-2025
To repozytorium zawiera wszystkie zadania wykonane na przedmiocie Ebiznes.

## Lista zadań
### [Zadanie 1](./Zadanie_1/README.md) - Docker
✅ 3.0 obraz ubuntu z Pythonem w wersji 3.10<br>
✅ 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem<br>
✅ 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)<br>
✅ 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle<br>
✅ 5.0 dodać konfigurację docker-compose

* [Kod](/Zadanie_1/)
* [Obraz dockera](https://hub.docker.com/r/angelonorelli/zadanie_1-app)

### [Zadanie 2](./Zadanie_2/) - Należy stworzyć aplikację na frameworku Play w Scali 3.
✅ 3.0 [Należy stworzyć kontroler do Produktów](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/fe8caf351dd7348625196164cdf9e51e1cfce8ea)<br>
✅ 3.5 [Do kontrolera należy stworzyć endpointy zgodnie z CRUD - dane
pobierane z listy](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/794826f9d17b1ef56f5f863c9c1e350a7778dba1)<br>
✅ 4.0 [Należy stworzyć kontrolery do Kategorii oraz Koszyka + endpointy
zgodnie z CRUD](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/eaa321a73eb9f6cfa023bd2a00859f080dcf1ddf) - commit z poprawionym kontrolerem Cart.scala [tutaj](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/881f3bc4c75f5d4225bcf0e0ac38b823ca09cbce)<br>
✅ 4.5 [Należy aplikację uruchomić na dockerze (stworzyć obraz) oraz dodać skrypt uruchamiający aplikację via ngrok](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/7d948b00f93bde884d9f12edd40ec4a14b241a82)<br>
✅ 5.0 [Należy dodać konfigurację CORS dla dwóch hostów dla metod CRUD Kontrolery mogą bazować na listach zamiast baz danych. CRUD: show all, show by id (get), update (put), delete (delete), add (post)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/2465aba6b1ef4b887b00d17967fc6474123efa2c).<br>

* [Kod](./Zadanie_2/scala_project/)
* [Obraz dockera](https://hub.docker.com/r/angelonorelli/zadanie_1-app)