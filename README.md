# RuBert VK Classifier frontend

Фронтенд для работы с [сервером](https://github.com/maryshev3/YourWay), использующим модель [RuBert VK Classifier](https://github.com/MrDaseMan/rubert-vk-classifier).

## Требования:
Пакетный менеджер npm

## Начало работы

dev server:
```bash
npm install
npm run dev
```

production server:
```bash
npm install
npm run build
```

run production server:
```bash
node .output/server/index.mjs
```

## Дополнительно
Необходимо зарегестрировать приложение [id.vk.com](https://id.vk.com/about/business/go) и добавить домен приложения для подключения авторизации в настройках, как `Базовый домен` и ссылку для редиректа вида `https://**domain**/auth/vk/callback` как `Доверенный Redirect URL`.