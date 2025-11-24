# Решение проблемы белого экрана на GitHub Pages

## Проблема
После деплоя на GitHub Pages открывается белый экран вместо приложения.

## Решение (уже настроено)

### 1. Настроен base path в `vite.config.js`
```js
base: '/Technology-tracker/' // Для production
```

### 2. Настроен Router в `src/App.jsx`
```jsx
<Router basename={import.meta.env.BASE_URL}>
```

### 3. Создан файл `.nojekyll` в `public/`
Этот файл отключает Jekyll на GitHub Pages.

### 4. Настроен скрипт копирования `index.html` в `404.html`
При сборке автоматически копируется `index.html` → `404.html` для правильной работы React Router.

## Важно!

### Если нужно изменить имя репозитория в конфигурации:

1. **Обновите `vite.config.js`:**
   ```js
   base: process.env.NODE_ENV === 'production' ? '/Technology-tracker/' : '/',
   ```

2. После изменения запустите:
   ```bash
   npm run build
   ```

## Деплой

### Вариант 1: Автоматический деплой через GitHub Actions (рекомендуется)

1. Закоммитьте все изменения:
   ```bash
   git add .
   git commit -m "Настройка для GitHub Pages"
   git push
   ```

2. В настройках репозитория GitHub:
   - Перейдите в **Settings** → **Pages**
   - В разделе **Source** выберите **GitHub Actions**
   - После первого push workflow автоматически запустится и задеплоит проект

### Вариант 2: Ручной деплой

1. Соберите проект:
   ```bash
   npm run build
   ```

2. Используйте gh-pages:
   ```bash
   npm install --save-dev gh-pages
   npm run deploy
   ```

## Проверка

После деплоя приложение будет доступно по адресу:
- `https://Mist1qu3X.github.io/Technology-tracker/`

Если это корневой репозиторий (username.github.io):
- Измените `base` в `vite.config.js` на `'/'`
- Приложение будет доступно по адресу: `https://ваш-username.github.io/`

## Если проблема осталась

1. Проверьте консоль браузера (F12) на наличие ошибок
2. Убедитесь, что имя репозитория совпадает с base path в `vite.config.js`
3. Проверьте, что файл `.nojekyll` существует в папке `public/`
4. Убедитесь, что при сборке создается файл `404.html` в папке `dist/`

