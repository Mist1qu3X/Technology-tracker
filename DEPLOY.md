# Инструкция по деплою на GitHub Pages

## Проблема с белым экраном

Если на GitHub Pages открывается белый экран, это связано с неправильной настройкой base path.

## Решение

### Вариант 1: Если репозиторий называется `username.github.io` (корневой домен)

1. В `vite.config.js` установите:
```js
base: '/',
```

2. В `src/App.jsx` Router должен быть без basename или с basename: `'/'`

### Вариант 2: Если репозиторий называется иначе (поддиректория)

1. В `vite.config.js` установите base с именем репозитория:
```js
base: '/имя-репозитория/',
```

2. В `src/App.jsx` Router должен использовать `basename={import.meta.env.BASE_URL}`

3. Убедитесь, что файл `public/.nojekyll` существует (уже создан)

## Текущая настройка

Проект настроен на работу с репозиторием `Technology-tracker` (https://github.com/Mist1qu3X/Technology-tracker).

Настройки уже правильно сконфигурированы в:
1. **vite.config.js** - base path: `/Technology-tracker/`
2. **src/App.jsx** - Router использует `basename={import.meta.env.BASE_URL}`
3. **public/.nojekyll** - отключение Jekyll

## Деплой

### Способ 1: Через GitHub Actions (рекомендуется)

1. Закоммитьте все изменения
2. Запушите в репозиторий
3. В настройках репозитория GitHub:
   - Settings → Pages
   - Source: GitHub Actions
   - После первого push workflow автоматически запустится

### Способ 2: Ручной деплой

```bash
npm run build
# Скопируйте содержимое папки dist в ветку gh-pages
# или используйте gh-pages npm package:
npm install --save-dev gh-pages
npm run deploy
```

## Проверка

После деплоя приложение будет доступно по адресу:
- `https://Mist1qu3X.github.io/Technology-tracker/`

## Важно!

Если имя репозитория отличается от `Technology-tracker`, обновите:
1. `vite.config.js` - base path на `/ваше-имя-репозитория/`

