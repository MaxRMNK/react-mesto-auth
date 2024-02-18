# Проект: "Mesto: регистрация и авторизация"
[Ссылка на Gihub Pages](https://maxrmnk.github.io/react-mesto-auth/)

## Описание
Проект выполнен в качестве проверочного задания в рамках учебной программы **[ЯндексПрактикум «Веб-разработчик»](https://practicum.yandex.ru/web/)**, курс 5 (спринт 7), **проектная работа #12**.

В рамках [двух предыдущих проектных работ](https://github.com/MaxRMNK/mesto-react) был выполнен перенос созданного ранее одностраничного сайта на React.

Целью данной проектной работы является изучение на практике возможностей регистрации и авторизации в приложении, переадресации пользователей на нужные страницы и создание приватных маршрутов.

## Что сделано
  * Сверстаны дополнительные страницы (регистрации и авторизации), компоненты модального окна, дополнительные элементы "шапки" сайта (навигация и информация о пользователе). [Макет в Figma](https://www.figma.com/file/5H3gsn5lIGPwzBPby9jAOo/Sprint-14-RU?node-id=0%3A1)
  * Созданы роуты для регистрации и авторизации пользователей (sign-up и sign-in), настроена защита от неавторизованных пользователей и описаны перенаправления.
  * Настроена регистрация и аутентификация пользователей по API, через сервис https://mesto.nomoreparties.co/
  * Реализована работа с локальным хранилищем и токеном.

## Разворачиваем проект локально
1. Склонируйте проект, перейдите в папку `/react-mesto-auth`
    ```shell
    git clone git@github.com:MaxRMNK/react-mesto-auth.git
    cd react-mesto-auth
    ```
2. Убедитесь, что у вас устновлен Node.js с библиотекой пакетов NPM
    ```shell
    node -v # проверка версии Node.js
    npm -v # проверка версии NPM
    ```
3. Установите проект и его зависимости
    ```shell
    npm install
    ```
## Команды
* Режим разработки. При вводе команды автоматически открывается браузер со страницей приложения на адресе `localhost:3000`. После любого сохранения исходного кода в приложении страница в браузере будет автоматически обновляться.
    ```shell
    npm run start # или просто `npm start`
    ```
    `Ctrl + C` - выход из режима разработки.

* Сборка проекта.
  - Сборка проекта. После выполнения команды в директории `/build` генерируется оптимизированная сборка проекта.
    ```shell
    npm run build
    ```
    Для запуска на сервере (локальном или веб-сервере) **перед сборкой** внутри файла `package.json` необходимо удалить строку `"homepage": "https://maxrmnk.github.io/react-mesto-auth/",`

  - Запуск собранного проекта.
    ```shell
    serve -s build
    ```
    В консоли отобразится сообщение, что проект выполняется на локальном сервере — по умолчанию адресом будет `localhost:3000`. Введите этот адрес в браузере и увидите свой проект!

    `Ctrl + C` - остановка локального сервера.

* Публикация проекта на GitHub Pages. Перед публикацией сайта на GitHub автоматически запускается пересборка проекта.
    ```shell
    npm run deploy
    ```

## Ошибки
После новой установки, при запуске проекта локально в режиме разработки могут появляться уведомления:
```shell
(node:13820) [DEP_WEBPACK_DEV_SERVER_ON_AFTER_SETUP_MIDDLEWARE] DeprecationWarning: 'onAfterSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
(Use `node --trace-deprecation ...` to show where the warning was created)
(node:13820) [DEP_WEBPACK_DEV_SERVER_ON_BEFORE_SETUP_MIDDLEWARE] DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated. Please use the 'setupMiddlewares' option.
```

У меня пока не получилось разобраться как исправить их правильней. Решения есть здесь:
* https://stackoverflow.com/questions/70469717/cant-load-a-react-app-after-starting-server
* https://stackoverflow.com/questions/74915353/onaftersetupmiddleware-and-onbeforesetupmiddleware-warnings-in-react
* https://discuss.codecademy.com/t/react-app-error/779264
