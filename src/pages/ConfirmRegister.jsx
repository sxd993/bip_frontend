import { EnterCodeForm } from '@/features/auth/confirm-register/ui/EnterCodeForm';
import { Link } from 'react-router-dom';

const TIMELINE_STEPS = [
  {
    label: 'Получите письмо',
    description: 'Мы отправили код на указанную при регистрации почту с темой «Код подтверждения».',
  },
  {
    label: 'Скопируйте код',
    description: 'Код состоит из 6 цифр и действителен 10 минут. Если письма нет — загляните в папку «Спам».',
  },
  {
    label: 'Вставьте ниже',
    description: 'После подтверждения регистрация завершится автоматически и мы перенаправим вас в личный кабинет.',
  },
];

export const ConfirmRegister = () => (
  <section className="bg-white py-15">
    <div className="max-w-6xl mx-auto px-4 md:px-6">
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-[0.35em] text-gray-400 mb-4">шаг 2 из 2</p>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">Подтверждение регистрации</h1>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
        <article className="border border-red-200 rounded-3xl p-10 shadow-[0px_25px_60px_rgba(239,68,68,0.08)]">
          <header className="flex items-center gap-4 mb-10">
            <span className="w-12 h-12 rounded-2xl bg-red-100 text-red-500 flex items-center justify-center font-semibold">
              01
            </span>
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">как это работает</p>
              <h2 className="text-2xl font-semibold text-gray-900">Небольшой чек-лист</h2>
            </div>
          </header>

          <div className="space-y-6">
            {TIMELINE_STEPS.map((step, index) => (
              <div key={step.label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div>
                  <p className="text-gray-900 font-medium mb-1">{step.label}</p>
                  <p className="text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="border border-gray-100 rounded-3xl p-8 md:p-10 bg-white shadow-[0px_25px_60px_rgba(15,23,42,0.08)]">
          <header className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-400 mb-3">код доступа</p>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Введите код из письма</h2>
            <p className="text-gray-500">Ниже — статические поля без логики. Здесь позже появится ввод и таймер.</p>
          </header>

          <div className="space-y-8">
            <div className="flex justify-between gap-2">
              <EnterCodeForm />
            </div>
          </div>


          <div className="mt-6 text-center text-sm text-gray-500">
            Не пришёл код? Позже тут будет обработчик повторной отправки либо ссылка на{' '}
            <Link to="/contacts" className="text-red-500 font-medium">
              службу поддержки
            </Link>
            .
          </div>
        </article>
      </div>
    </div>
  </section>
);
