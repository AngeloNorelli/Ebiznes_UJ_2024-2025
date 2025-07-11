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


### [Zadanie 4](./Zadanie_4/)
✅ 3.0 [Należy stworzyć aplikację we frameworki echo w j. Go, która będzie miała kontroler Produktów zgodny z CRUD](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/6f31de476c65d208aa0dbd7d9de5560bfb46a189)<br>
✅ 3.5 [Należy stworzyć model Produktów wykorzystując gorm oraz wykorzystać model do obsługi produktów (CRUD) w kontrolerze (zamiast listy)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/6f31de476c65d208aa0dbd7d9de5560bfb46a189)<br>
✅ 4.0 [Należy dodać model Koszyka oraz dodać odpowiedni endpoint](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/57ee64ed46c6938e695651f5736e974e17f362b6)<br>
✅ 4.5 [Należy stworzyć model kategorii i dodać relację między kategorią, a produktem](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/f89e9db40ae7f60035afd630dc9f1cdc87615062)<br>
✅ 5.0 [pogrupować zapytania w gorm’owe scope'y](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/3b60e9e697eb8b6684b9e4818d451e19d47abbf2)<br>
> Do endpointu dodającego produkt do kategorii dodałem jeszcze możliwość dodania istniejącego produktu do konkretnej kategorii - [commit](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/0eebc697a9870e73578e6ee5eda03f8da8272a83)

* [Kod](./Zadanie_4/project/)
* [Nagranie](./Zadanie_4/zadanie_4-nagranie.mp4)
<video height="300px" width=auto src="https://github.com/user-attachments/assets/009c64a8-3422-4261-a940-445052e473aa"></video>

### [Zadanie 5 Frontend](./Zadanie_5/)
Należy stworzyć aplikację kliencką wykorzystując bibliotekę React.js.
W ramach projektu należy stworzyć trzy komponenty: Produkty, Koszyk
oraz Płatności. Koszyk oraz Płatności powinny wysyłać do aplikacji
serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach
z aplikacji serwerowej. Aplikacja serwera w jednym z trzech języków:
Kotlin, Scala, Go. Dane pomiędzy wszystkimi komponentami powinny być
przesyłane za pomocą React hooks.

✅ 3.0 [W ramach projektu należy stworzyć dwa komponenty: Produkty oraz Płatności; Płatności powinny wysyłać do aplikacji serwerowej dane, a w Produktach powinniśmy pobierać dane o produktach z aplikacji serwerowej;](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/59b27e0aec27e65f3bb7cf5ec10244222a4d4276)<br>
✅ 3.5 [Należy dodać Koszyk wraz z widokiem; należy wykorzystać routing](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/2f1c1f495c96d88140b53a47e9af2d88eacde626)<br>
✅ 4.0 [Dane pomiędzy wszystkimi komponentami powinny być przesyłane za pomocą React hooks](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/25d7e21dbed6b12dd5a4a5af39d3e2d7ea9e8e46)<br>
> Nieświadomie zrobiłem cześć tego w commicie na ocenę 3.5

❌ 4.5 [Należy dodać skrypt uruchamiający aplikację serwerową oraz kliencką na dockerze via docker-compose](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/)<br>
❌ 5.0 [Należy wykorzystać axios’a oraz dodać nagłówki pod CORS](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/)<br>
> Przy próbie nagrania demo zobaczyłem, że pomyliłem się z identyfikatorem produktów, zamiast product.ID miałem wszędzie product.id i poprawiłem to w [tym commicie](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/46204f2c45064cb92143bb9a503ea147c100cfb5)

* [Kod](./Zadanie_5/react-app/)
* [Nagranie](./Zadanie_5/zadanie_5-nagranie.mp4)
<video height="300px" width=aut src="https://github.com/user-attachments/assets/b650058c-a844-45ef-90b8-07ae1eace486"></video>

### [Zadanie 6 Testy](./Zadanie_6/)
Należy stworzyć 20 przypadków testowych w jednym z rozwiązań:

- Cypress JS (JS)
- Selenium (Kotlin, Python, Java, JS, Go, Scala)

Testy mają w sumie zawierać minimum 50 asercji (3.5). Mają również
uruchamiać się na platformie Browserstack (5.0). Proszę pamiętać o
stworzeniu darmowego konta via https://education.github.com/pack.

✅ 3.0 [Należy stworzyć 20 przypadków testowych w CypressJS lub Selenium (Kotlin, Python, Java, JS, Go, Scala)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/8d7d28015f7ddc0cdc316f1b0c87c317c85690d6)<br>
❌ 3.5 [Należy rozszerzyć testy funkcjonalne, aby zawierały minimum 50 asercji](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/)<br>
❌ 4.0 [Należy stworzyć testy jednostkowe do wybranego wcześniejszego projektu z minimum 50 asercjami](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/)<br>
❌ 4.5 [Należy dodać testy API, należy pokryć wszystkie endpointy z minimum jednym scenariuszem negatywnym per endpoint](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/)<br>
❌ 5.0 [Należy uruchomić testy funkcjonalne na Browserstacku](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/)<br>

* [Kod](./Zadanie_4/project/cypress)
<video height="300px" width=aut src="https://github.com/user-attachments/assets/8fdb09f4-4c17-4aff-abec-f8d330f8e092"></video>

### [Zadanie 7 - Sonar]

✅ 3.0 [Należy dodać litera do odpowiedniego kodu aplikacji serwerowej w hookach gita](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/48a95a65fb6d4fcfa6ca7fceb0f94a6b52d02ce6)<br>
✅ 3.5 [Należy wyeliminować wszystkie bugi w kodzie w Sonarze (kod aplikacji serwerowej)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/7a7656739056e6cd51fa87c33abc4988a741d63c)<br>
✅ 4.0 [Należy wyeliminować wszystkie zapaszki w kodzie w Sonarze (kod aplikacji serwerowej)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/7a7656739056e6cd51fa87c33abc4988a741d63c)<br>
✅ 4.5 [Należy wyeliminować wszystkie podatności oraz błędy bezpieczeństwa w kodzie w Sonarze (kod aplikacji serwerowej)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/7a7656739056e6cd51fa87c33abc4988a741d63c)<br>
✅ 5.0 [Należy wyeliminować wszystkie błędy oraz zapaszki w kodzie aplikacji klienckie](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/725ff62483c679cd20678c7287b2f6bd944e20f1)<br>

### [Zadanie 8 - Oauth2]

✅ 3.0 [logowanie przez aplikację serwerową (bez Oauth2)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/ab0bd29e9b0b851e186d27ad7dade6c3647083ee)<br>
✅ 3.5 [rejestracja przez aplikację serwerową (bez Oauth2)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/576f703818607e223809e01a0dbdbcda25d08e5b)<br>
✅ 4.0 [logowanie via Google OAuth2](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/520a90d5587f54e6a3d3828c289d0f74585d2e60)
✅ 4.5 [logowanie via Facebook lub Github OAuth2](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/d1fadf9e5d117fb73e1164fa74c1601241920c0c)<br>
❓ 5.0 zapisywanie danych logowania OAuth2 po stronie serwera - [Oauth Google](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/520a90d5587f54e6a3d3828c289d0f74585d2e60) i [OAuth Github](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/d1fadf9e5d117fb73e1164fa74c1601241920c0c)<br>

<video height="300px" width=aut src="https://github.com/user-attachments/assets/b8df347b-4307-4336-8812-39d15c8f57af"></video>

### [Zadanie 9 - Chatbot]

✅ 3.0 [należy stworzyć po stronie serwerowej osobny serwis do łącznia z chatbotem do usługi chat](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/03ee9822e9b45977114bfcd02d2d63923e12dc71)<br>
✅ 3.5 [należy stworzyć interfejs frontowy dla użytkownika, który komunikuje się z serwisem; odpowiedzi powinny być wysyłane do frontendowego interfejsu](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/dc323960443cd773d55b6b7fd2197246dade0801)<br>
✅ 4.0 [stworzyć listę 5 różnych otwarć oraz zamknięć rozmowy](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/723b208e4221a1d22ca177776474c8e2e1238303)<br>
❌ 4.5 filtrowanie po zagadnieniach związanych ze sklepem (np. ograniczenie się jedynie do ubrań oraz samego sklepu) do chatbota<br>
❌ 5.0 filtrowanie odpowiedzi po sentymencie<br>

<video height="300px" width=aut src="https://github.com/user-attachments/assets/a0b9d241-b182-49eb-a8dd-6d40c0a26416"></video>

### [Zadanie 10 - Chmura/CI](http://152.70.42.33:3000/)

> Z góry przepraszam, ale dużo poprawek zrobiłem by zobaczyć czy działa i okazało się, że głównym problemem była zła nazwa katalogu z workflows

✅ 3.0 [Należy stworzyć odpowiednie instancje po stronie chmury na dockerze](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/500d442b70e16689c089660e18d9b84e3d30de84) - [poprawki w kodzie umożliwiająe działanie w chmurze](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/7da24e0bd9bc0c8657415811a5fd4691d993a218)<br>
✅ 3.5 [Stworzyć odpowiedni pipeline w Github Actions do budowania aplikacji (np. via fatjar)](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/726578a77d91baeafd07ac1fe631d3aafbf73500)<br>
> poprawki z tym związane:<br>
> [niepotrzebne linijki](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/6b4ba4512ac5b6136974438fcf8dc390c1b30144) oraz
> [wczytywanie secretów zawartych w .env](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/de8e43bbbd35c3b00dbc4f44483900506e00603b)
> [uruchamianie workflow przez jeden workflow i dopiero po zakończeniu buildów deploy](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/2efff86fd74df4ba9eb9d455e5637f7f02cf9d4b)

✅ 4.0 [Dodać notyfikację mailową o zbudowaniu aplikacji](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/2f67e453b47fbf4ddf084e2849441b63747de044)<br>
> poprawki z tym związane:<br>
> [zmiana smpt](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/38474ba1bee29ab3bd0403552a12a710d407c343)<br>

✅ 4.5 [Dodać krok z deploymentem aplikacji serwerowej oraz klienckiej na chmurę](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/cc1e184b209f28178a6cac7e563cd6124d1b14b3)<br>
❌ 5.0 [Dodać uruchomienie regresyjnych testów automatycznych (funkcjonalnych) jako krok w Actions](https://github.com/angelonorelli/Ebiznes_UJ_2024-2025/commit/)<br>

Dowody, że działa:
* link do apki na [chmurze](http://152.70.42.33:3000/) <-
* screen maila z workflow: ![screen maila](mail.png)
* link do [workflow](https://github.com/AngeloNorelli/Ebiznes_UJ_2024-2025/actions/runs/15544124098)
> chatbot nie będzie działać, bo na to instancja chmury nie pozwala
