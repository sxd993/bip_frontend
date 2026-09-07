Общайся со мной на русском языке.

Ты работаешь в репозитории bip. Все правила ниже обязательны.
Любое решение, нарушающее их, считается неверным.

================================================================
СТЕК И ОКРУЖЕНИЕ
================

- React
- TypeScript
- npm — единственный допустимый менеджер пакетов (npm/yarn запрещены)
- ESLint + Prettier обязательны

Команды:

- dev: npm run dev
- build: npm run build
- lint: npm run lint

================================================================
АРХИТЕКТУРА (FSD-ПОДОБНАЯ, СТРОГО)
==================================

Корень: frontend/src/

Слои:

- app/ — React App Router: routes, layouts, route handlers, proxy, глобальные провайдеры
- widgets/ — крупные UI-блоки
- features/ — фичи: UI + model/
- entities/ — бизнес-сущности
- shared/ — переиспользуемые утилиты и инфраструктура

Правила:

- Запрещён импорт из верхнего слоя в нижний.
- Запрещены циклические зависимости.
- UI не знает о внутренней реализации нижних слоёв.

Импорты:

- Только через алиасы: entities/_, features/_, widgets/_, shared/_, app/\_
- Алиас @/ запрещён.
- В импортах обязательно указывать расширения .ts / .tsx.

================================================================
SSR / CLIENT COMPONENTS (React)
=================================

По умолчанию `page.tsx` и `layout.tsx` — Server Components, без `"use client"`.

- Публичные SEO-страницы — Server Components / SSR / SSG; не переводить в client без причины.
- Защищённые страницы — проверка на сервере через `getServerSession()` и server-side redirect при отсутствии доступа.
- `"use client"` — только где нужен интерактив: формы, handlers, `useSession`, `useRouter`, `useState`, `useEffect` и т.п.
- Header / auth UI может использовать client session; при мигании auth-состояния предпочтительно передавать `initialUser` из server layout в `SessionProvider`.
- `proxy.ts` и frontend role guards — только UX, не граница безопасности. Реальная защита ролей — на backend через guards.

Cookie-only auth (инварианты, нарушать запрещено):

- `accessToken` / `refreshToken` не хранить в localStorage, sessionStorage, Zustand, React state.
- Не возвращать токены в JSON клиенту.
- Не добавлять `Authorization: Bearer` на клиенте.
- Токены только в httpOnly cookies.

================================================================
SEO METADATA (SNIPPET)
======================

Публичные `page.tsx` и `layout.tsx` — обязательно `export const metadata` прямо в файле страницы.

`layout.tsx`:

- `metadataBase` — URL сайта
- `title.default` — общий title сайта
- `title.template` — `"%s — U-Start"`
- `description` — общее описание сайта (1–2 предложения, до ~160 символов)

Каждая публичная страница:

- `title` — конкретный, по смыслу контента/h1 (не «Главная»)
- `description` — уникальный, по содержанию страницы, 70–160 символов
- запрещено: `description: "U-Start"` или другой placeholder без смысла

Правило: `title` и `description` пишутся для snippet в Google, не для внутренних нужд.
При добавлении новой публичной страницы — metadata обязателен с первого коммита.
Не выносить SEO metadata в `shared/config` — только inline в `app/**/page.tsx` и `layout.tsx`.

================================================================
ПУБЛИЧНЫЙ API МОДУЛЕЙ
=====================

Фичи, сущности и виджеты имеют один публичный API через index.ts.

shared/ui (UI kit):

- Компоненты экспортировать как default export из файла.
- В index модуля — реэкспорт по имени, например:

```ts
export { default as MyButton } from "./MyButton.tsx";
```

Запрещено:

- импортировать внутренние файлы model/, ui/, api/, lib/ напрямую;
- импортировать приватные хуки и контроллеры.

Разрешён только импорт из корня модуля.

Исключение для `entities/session` (React runtime):

- `entities/session/index.ts` — client и общий публичный API;
- `entities/session/server.ts` — Node.js server (BFF route handlers, SSR);
- `entities/session/edge.ts` — Edge runtime (`proxy.ts` / middleware).

Импорт `server.ts` и `edge.ts` разрешён только из `app/api/*`, SSR-страниц и `proxy.ts`.

================================================================
СТРУКТУРА FEATURE / ENTITY
==========================

Рекомендуемая структура модуля:

- ui/ — UI-компоненты
- model/ — хуки, контроллеры, сторы, селекторы
- api/ — API-запросы и react-query хуки, если есть
- types/ — типы
- lib/ — утилиты модуля, не shared
- index.ts — публичный API

Структура должна быть единообразной по проекту.

================================================================
ИМЕНОВАНИЕ
==========

PascalCase:

- классы, типы, интерфейсы, enum’ы, DTO

camelCase:

- переменные, функции, параметры, хуки

UPPER_SNAKE_CASE:

- константы

Правила:

- Интерфейсы без I
- Типы без T
- DTO: PascalCase + Dto

================================================================
ФУНКЦИИ
=======

- Всегда указывать возвращаемый тип.
- Для утилит использовать Function Declaration.
- Более 2 параметров → передавать единым объектом.

================================================================
DESIGN TOKENS (globals.css @theme)
==================================

Источник правды: `src/app/globals.css` (`@theme`).

Все цвета — только семантические токены из `@theme`.
Запрещено использовать `neutral-*`, `sky-*`, `red-*`, `green-*` и другие
произвольные палитры Tailwind в UI-компонентах.

В Tailwind v4: `--color-primary` → `bg-primary`, `text-primary`, `border-primary` и т.д.

Brand:

- `primary` (#0077ff) — CTA, ссылки, активные элементы, бренд
- `primary-hover` (#0062d6) — hover primary-кнопок и ссылок
- `on-primary` (#ffffff) — текст и иконки на primary-фоне

Surfaces (белые элементы на сером фоне):

- `background` (#f2f3f5) — фон страницы (`body`)
- `surface` (#ffffff) — header, footer, карточки, белые блоки
- `surface-muted` (#e2e5e9) — hover ghost-кнопок, лёгкая подложка на белом

Правило: hover на белом (`surface`) → `surface-muted`.
`background` для hover на белом слишком слабый.

Text:

- `text` (#111827) — основной текст, заголовки
- `text-muted` (#6b7280) — описания, подписи, неактивные ссылки

Borders:

- `border` (#d4d8de) — разделители, обводки блоков

Status:

- `error` (#ef4444) — ошибки, деструктивные действия
- `success` (#22c55e) — успех, подтверждения

Font:

- `font-family-sans` — Manrope + system fallbacks; default на `body` через `font-sans`

Примеры классов:

- `bg-primary hover:bg-primary-hover text-on-primary`
- `bg-surface border-border`
- `text-text` / `text-text-muted`
- `hover:bg-surface-muted` — ghost-кнопки на белом фоне
- `rounded-lg` — стандартное скругление кнопок и интерактивных элементов
- `bg-error` / `text-error` / `bg-success` / `text-success`

UI conventions (цвета и компоненты):

- Минимализм big-tech: много воздуха, чистая типографика, без лишнего декора.
- Без теней и blur в новых компонентах, если явно не запрошено иначе.
- Кнопки: ghost → `hover:bg-surface-muted`, primary → `bg-primary hover:bg-primary-hover`.
- Навигация: активная ссылка — `text-text`, неактивная — `text-text-muted`.

Отступы между секциями страницы:

- Только `mt` / `mb` на корневом `<section>` виджета — не на внутренних блоках.
- Межсекционные отступы не смешивать с отступами внутри секции (`mt-6`, `mt-8 sm:mt-10` и т.п.).
- Breakpoint `sm:` (≥640px) — desktop; без префикса — mobile.
- Mobile: `mt-10` / `mb-10` (40px).
- Desktop: `sm:mt-20` / `sm:mb-20` (80px).
- Первая секция страницы: `mt-10 sm:mt-20` (без `mb`).
- Последняя секция перед footer: добавить `mb-10 sm:mb-20`.
- Между секциями — только `mt` следующей секции; не дублировать `mb` предыдущей и `mt` следующей.
- Исключение: страница 404 — `mt-16 mb-16 sm:mt-30 sm:mb-30` для вертикального центрирования.

Примеры:

- первая секция: `mt-10 sm:mt-20`
- секция после другой + отступ до footer: `mt-10 mb-10 sm:mt-20 sm:mb-20`
- внутри секции (заголовок → подзаголовок): `mt-6 sm:mt-8`

Скругление (border-radius):

- Стандарт проекта — `rounded-lg` (8px).
- Обязательно для: кнопок, icon-button, пунктов mobile-меню, инпутов, карточек, dropdown.
- Запрещено без явной причины: `rounded-full`, `rounded-xl`, `rounded-2xl`, `rounded-md`, `rounded-sm`.
- Исключение: аватары, badge-pill, если пользователь явно запросил pill-стиль.

Пример кнопки:

- `rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-on-primary hover:bg-primary-hover`
- `rounded-lg px-3 py-1.5 text-sm font-medium text-text hover:bg-surface-muted`

При добавлении новых цветов — сначала токен в `globals.css`, затем использование в компонентах.

================================================================
REACT + TYPESCRIPT
==================

- React.FC запрещён.
- Пропсы компонентов: через type или interface.
- Тип/интерфейс пропсов: <ComponentName>Props.
- Объекты: формы данных, опции, DTO-подобные структуры — через interface.
- Типы событий брать из React.

React-компоненты (app/providers, features/ui, widgets, entities/ui, shared/ui):

- Все компоненты — стрелочная функция с именованным экспортом.
- export function и export default для компонентов запрещены.
- Возвращаемый тип: ReactElement (или ReactElement | null, если компонент может вернуть null).
- Пропсы: interface <ComponentName>Props.

```tsx
// ✅
export const LoginForm = (): ReactElement => {
  return <form>...</form>;
};

export const AppProviders = ({ children }: AppProvidersProps): ReactElement => {
  return <>{children}</>;
};

// ❌
export function LoginForm() { ... }
export default LoginForm;
const LoginForm = () => { ... };
```

React pages и layouts в app/ (page.tsx, layout.tsx):

- Тот же стиль: export const Page = () => { ... }; в конце файла — export default Page; (требование React).
- Для async server components: export const Page = async () => { ... }; export default Page;
- Явный ReactElement не обязателен — TypeScript выводит тип из JSX.
- Пропсы: interface <ComponentName>Props или <LayoutName>Props — обязательны.

```tsx
export const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
```

```tsx
export const StudentProfilePage = async () => {
  const session = await getServerSession();
  return <div>...</div>;
};

export default StudentProfilePage;
```

Утилиты, хуки, lib-функции — Function Declaration (export function), не стрелочные.

Обёртки над UI-библиотекой в shared/ui:

- Только библиотечные пропсы — тип библиотеки напрямую в сигнатуре, например props: FlexProps.
- Есть свои пропсы, например dataTestId — interface <ComponentName>Props extends LibraryProps { свои? }.
- Свои пропсы деструктурировать отдельно.
- Остальное передавать через {...props}.
- Children, если есть, явно деструктурировать и передавать в JSX.
- Возвращаемый тип: React.ReactElement или ReactElement.
- Объявление: export const Component = (...) => { ... };

Типизация:

- object запрещён → Record<string, unknown> или конкретный тип.
- any запрещён, кроме крайних случаев.
- unknown — предпочтительная альтернатива.

Касты и non-null:

- as использовать только в крайнем случае.
- Приоритет — нормальная типизация без кастов.
- id! и другие non-null assertions не использовать.
- Если id всегда есть — в интерфейсе указывать обязательным.
- Если один интерфейс используется и для отправки на backend, и для приёма — разделять типы или использовать id: number | null при создании/сохранении.

================================================================
UI И ЛОГИКА
===========

В UI-компонентах запрещено:

- бизнес-логика;
- работа с API;
- работа со сторами;
- эффекты;
- сложный derived-state;
- агрегация данных;
- форматирование бизнес-данных.

Допускается:

- map для JSX-списков;
- простые JSX-условия, зависящие от ViewModel;
- деструктуризация props/ViewModel.

UI только отображает данные.

================================================================
UI-ПАПКА (ОСОБЫЙ РЕЖИМ)
=======================

Внутри ui-компонента запрещены бизнес-логика, API, сторы, эффекты и сложные вычисления.

Допустимы:

- простые JSX-условия;
- map для списков;
- деструктуризация props/ViewModel;
- вызов внутреннего custom hook из model/ текущего модуля.

Проп-дриллинг запрещён.

UI-компоненты не должны получать бизнес-логику через пропсы.
Передача простых UI-данных и ViewModel через пропсы внутри одного модуля допустима.

Использование:

```ts
const vm = useXxx();
```

================================================================
КАСТОМНЫЕ ХУКИ (VIEWMODEL)
==========================

Хук:

- не возвращает JSX;
- возвращает данные, состояния и обработчики;
- не зависит от UI-деталей.

Размещение:

- features/.../model/
- widgets/.../model/
- app/.../model/

Размещение в ui/ запрещено.

Сложность:

- хук >200 строк или с несколькими ответственностями — дробить;
- 1 хук = 1 ответственность.

================================================================
АНТИ-ПАТТЕРНЫ
=============

Запрещены:

- God components / God hooks;
- Props drilling;
- компоненты и хуки с несколькими ответственностями.

================================================================
СОСТОЯНИЕ И API
===============

- Серверные данные — только в TanStack Query.
- Zustand — только UI/доменное состояние.

Запрещено:

- хранить копию ответа API в Zustand без явной причины.

React Query:

- query keys централизованы;
- queries/mutations создаются в api/ или model/, не в UI;
- select и маппинг ответов — в model/.

================================================================
LOADING / ERROR / EMPTY
=======================

Обработка isLoading / isError / empty:

- выполняется в контейнерах app/widgets/features;
- запрещена в чистых ui-компонентах.

UI получает только готовые данные для отображения.

================================================================
SHARED (ОГРАНИЧЕНИЯ)
====================

В shared/ запрещено:

- бизнес-логика;
- доменные знания;
- Zustand-сторы;
- React Query хуки.

shared — только нейтральные утилиты и инфраструктура.

================================================================
КОММЕНТАРИИ
===========

Разрешены только:

- NOTE:
- TODO:
- FIXME:

Комментарии минимальные.
Существующие комментарии удалять или изменять запрещено.

================================================================
ПОРЯДОК РАБОТЫ
==============

Если пользователь описал задачу:

- Сначала анализ.
- Предложить более простое или правильное решение.
- Не писать код до согласования, если задача требует архитектурного выбора.

================================================================
ПРАВИЛА ИЗМЕНЕНИЙ
=================

Перед коммитом:

1. Проверить архитектуру и публичные API.
2. Проверить импорты и расширения.
3. Проверить отсутствие @/.
4. pnpm run lint.
5. pnpm run build.
6. .env не коммитить.

================================================================
ЧЕКЛИСТ
=======

- React, без Vite
- App Router через app/
- Алиасы + .ts/.tsx
- Без @/
- UI без бизнес-логики
- Хуки в model/
- Public API через index.ts
- React Query ≠ Zustand
- Без any / object
- Без as и id! по возможности
- ESLint / Prettier без ошибок
- pnpm run build проходит
