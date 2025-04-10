# Ebiznes 2024-2025
To repozytorium zawiera wszystkie zadania wykonane na przedmiocie Ebiznes.

## Lista zadań
### [Zadanie 1](./Zadanie_1/README.md) - Docker
✅ 3.0 obraz ubuntu z Pythonem w wersji 3.10<br>
✅ 3.5 obraz ubuntu:24.02 z Javą w wersji 8 oraz Kotlinem<br>
✅ 4.0 do powyższego należy dodać najnowszego Gradle’a oraz paczkę JDBC SQLite w ramach projektu na Gradle (build.gradle)<br>
✅ 4.5 stworzyć przykład typu HelloWorld oraz uruchomienie aplikacji przez CMD oraz gradle<br>
✅ 5.0 dodać konfigurację docker-compose
> Zadanie wykonałem przed 24.03 i dopisuję, że moim zdaniem oddałem je na 5

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


### [Zadanie 3](./Zadanie_3/) - Kotlin
✅ 3.0 [Należy stworzyć aplikację kliencką w Kotlinie we frameworku Ktor,
która pozwala na przesyłanie wiadomości na platformę Discord](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/22818e6d5d8fff69f7f2b92b0946a1255e7f6ae1)<br>
✅ 3.5 [Aplikacja jest w stanie odbierać wiadomości użytkowników z
platformy Discord skierowane do aplikacji (bota)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/d8fe699e9b4882d59e27363ac34fbfabb8ddcadb)<br>
✅ 4.0 [Zwróci listę kategorii na określone żądanie użytkownika](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/65428b8b3028522a529c1468190d5ea4a612bdd5)<br>
✅ 4.5 [Zwróci listę produktów wg żądanej kategorii](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/8ed9ac0456879624b60e32447c5eedd919609f0c)<br>
❌ 5.0 [Aplikacja obsłuży dodatkowo jedną z platform: Slack, Messenger,
Webex](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/).<br>

* [Kod](./Zadanie_3/ktor-discord-client/)
* [Nagranie](./Zadanie_3/zadanie_3-nagranie.mp4)<br>
<video height="300px" width=auto src="https://github.com/user-attachments/assets/bcec2786-374d-4753-a957-ec6c27d1b53f"></video>


### [Zadanie 4]
✅ 3.0 [Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/6f31de476c65d208aa0dbd7d9de5560bfb46a189)<br>
✅ 3.5 [Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/6f31de476c65d208aa0dbd7d9de5560bfb46a189)<br>
✅ 4.0 [Należy dodać model Koszyka oraz dodać odpowiedni endpoint](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/57ee64ed46c6938e695651f5736e974e17f362b6)<br>
✅ 4.5 [Należy stworzyć model kategorii i dodać relację między kategorią, a produktem](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/f89e9db40ae7f60035afd630dc9f1cdc87615062)<br>
✅ 5.0 [pogrupować zapytania w gorm’owe scope'y](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/3b60e9e697eb8b6684b9e4818d451e19d47abbf2)<br>
> Do endpointu dodającego produkt do kategorii dodałem jeszcze możliwość dodania istniejącego produktu do konkretnej kategorii - [commit](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/0eebc697a9870e73578e6ee5eda03f8da8272a83)

* [Kod](./Zadanie_4/project/)
* [Nagranie](./Zadanie_4/zadanie_4-nagranie.mp4)
<video height="300px" width=auto src="https://github.com/user-attachments/assets/009c64a8-3422-4261-a940-445052e473aa"></video>

