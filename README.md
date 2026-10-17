# Matrix Checklist Widget

Prosty widget checklisty do osadzenia w Element/Matrix.

## Co potrafi

- zaznaczanie/odznaczanie zadań,
- dodawanie nowych zadań,
- usuwanie pojedynczych zadań,
- usuwanie wszystkich wykonanych,
- zapisywanie stanu w `localStorage`,
- osobny klucz danych dla `roomId`, jeśli Element przekaże identyfikator pokoju.

> Ta wersja zapisuje dane lokalnie w przeglądarce. Nie synchronizuje checklisty
> między różnymi użytkownikami ani urządzeniami.

## GitHub Pages

1. Utwórz nowe repozytorium na GitHubie, np. `matrix-checklist`.
2. Wgraj do głównego katalogu:
   - `index.html`
   - `style.css`
   - `app.js`
3. Wejdź w **Settings → Pages**.
4. W sekcji publikacji wybierz gałąź `main` i katalog `/ (root)`.
5. Po publikacji otrzymasz adres podobny do:

   `https://TWOJ_LOGIN.github.io/matrix-checklist/`

## Dodanie do Element/Matrix

Jeżeli Twój klient Element zezwala na własne widgety, możesz użyć adresu
GitHub Pages i przekazać parametry w fragmencie URL, np.:

`https://TWOJ_LOGIN.github.io/matrix-checklist/#/?widgetId=$matrix_widget_id&userId=$matrix_user_id&roomId=$matrix_room_id`

W zależności od wdrożenia Element sposób dodawania własnego widgetu może być
dostępny z interfejsu pokoju albo przez komendę `/addwidget`.

## Następny krok: wspólna checklista

Aby checkboxy synchronizowały się między wszystkimi uczestnikami pokoju,
trzeba podłączyć Matrix Widget API i zapisywać stan w Matrixie zamiast wyłącznie
w `localStorage`.
