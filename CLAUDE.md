# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## О проекте

BIP (Баукен и Партнеры) — платформа юридических услуг, монорепозиторий из двух пакетов:

- `bip_frontend/` — React 19 SPA (Vite)
- `bip_backend/` — REST API на Express.js

## Команды

### Фронтенд (`bip_frontend/`)
```bash
npm run dev       # Запуск dev-сервера Vite
npm run build     # Продакшн-сборка
npm run lint      # ESLint
npm run preview   # Предпросмотр продакшн-сборки
```

### Бэкенд (`bip_backend/`)
```bash
node server.js    # Запуск сервера (порт 8000)
nodemon server.js # Запуск с авто-перезагрузкой
```

Бэкенду нужен файл `.env` — все 17 переменных описаны в `.env.example` (база данных, JWT-секрет, Bitrix24 API, Timeweb AI API, почтовые реквизиты).

## Архитектура

### Фронтенд

Структура следует Feature-Sliced Design (FSD): `features/` → `entities/` → `widgets/` → `pages/` → `shared/`.

**Псевдонимы путей** (настроены в `vite.config.js` и `jsconfig.json`):
- `@` → `src/`
- `@pages`, `@features`, `@entities`, `@widgets`, `@shared` → соответствующие директории

**Разделение состояния:**
- Redux Toolkit (`src/app/providers/store/`) — состояние авторизации и сессии
- TanStack React Query — серверные данные
- Axios-инстанс в `src/shared/api/` (credentials: true, базовый URL из `VITE_API_URL`)

Страницы используют `React.lazy` + `Suspense` для разделения кода. Защищённые маршруты обёрнуты в auth guard в `src/entities/business/user/`.

### Бэкенд

Модульная структура по фичам в `src/features/` — каждая содержит свои контроллер, роутер и сервис. Все маршруты подключаются в `server.js`.

**Аутентификация:** JWT в HTTP-only cookies, проверяется через `src/middleware/auth.js`.

**Флоу AI-чата** (`src/features/ai-chat/`): принимает сообщение → отправляет в Timeweb AI API с системным промптом для юридических консультаций → стримит ответ через Server-Sent Events → если в ответе AI обнаружен JSON-блок сделки, автоматически создаёт контакт и сделку в Bitrix24.

**Внешние интеграции:**
- `src/services/bitrix.js` — CRM Bitrix24 (сделки, контакты)
- `src/services/aiService.js` — Timeweb AI (OpenAI-совместимый), стриминг
- `src/services/mailTransporter.js` / `src/services/email.js` — Nodemailer
- `src/config/database.js` — MySQL-пул с поддержкой SSL

## Ключевые паттерны

- Бэкенд использует `mysql2/promise` с пулом соединений: всегда `await pool.query(...)`.
- Валидация через Joi (`src/utils/validation.js`).
- Стриминг на фронтенде (AI-чат) читает `ReadableStream` из fetch в `src/features/ai-chat/`.
- Tailwind CSS 4 подключён через плагин `@tailwindcss/vite` — файла `tailwind.config.js` нет.
