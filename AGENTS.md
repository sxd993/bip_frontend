# Баукен и Партнеры — Frontend

React 19 + Vite + Tailwind CSS 4 + Redux Toolkit + React Query. Архитектура FSD-like.

## Стек
- Роутинг: React Router 7
- Стейт: Redux Toolkit + React-Redux
- Данные: TanStack React Query + axios
- UI: Tailwind CSS, Framer Motion, MUI (отдельные компоненты)
- Формы: react-hook-form

## Архитектура: FSD (Feature-Sliced Design)

Весь новый код пишется по FSD. Внутри каждого слоя — сегменты `api/`, `model/`, `ui/` (или `components/`).

```
app/          — инициализация: провайдеры, Redux store, роутер (AppRouter.jsx)
entities/     — бизнес-сущности: user, deals, companies
              └─ entity/model/useXxx.js  entity/api/xxxApi.js  entity/ui/
features/     — фичи: auth, create-appeal, reply-to-appeal, ai-chat
              └─ feature/api/     ← fetch-функции
                 feature/model/   ← хуки с логикой (useXxx)
                 feature/ui/ или components/ ← компоненты
pages/        — тонкие страницы: только разметка + вызов хука из features/model
              └─ hooks/           ← хуки уровня страницы (если нельзя в features)
widgets/      — сложные блоки: Header, Footer, home-баннеры, LegalAccount
shared/       — переиспользуемое: api/client.jsx (axios instance), хуки, UI
```

**Правило:** вся бизнес-логика и состояние — в `features/*/model/`. Страница импортирует хук и рендерит JSX.

## API
`VITE_API_URL` (`.env`) — база для всех запросов. Axios-клиент: `shared/api/client.jsx`.

## Бэкенд
Node.js/Express на порту 8000. Основные роуты: `/auth`, `/user`, `/deals`, `/transactions`, `/personal_account`, `/ai-chat`.

## Bitrix24
Домен `baukenipartnery.bitrix24.ru`. Все операции с CRM идут через бэкенд — фронт напрямую с Bitrix не общается.

## Аутентификация
JWT в httpOnly-куках. Защищённые страницы оборачиваются в `AuthGuard` (`entities/business/user/lib/AuthGuard`). Типы пользователей: физлицо, юрлицо, сотрудник юрлица.

## Цветовая схема
Основной цвет: `#1e3a5f` (тёмно-синий). Акцент: `#a01e1e` (бордовый).
