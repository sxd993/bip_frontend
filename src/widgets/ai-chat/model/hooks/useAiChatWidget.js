import { useAiChat } from '@/features/ai-chat';
import { useUser } from '@/entities/auth';

const GUEST_AUTH_MESSAGE = {
  role: 'assistant',
  content:
    'Здравствуйте! Чтобы начать консультацию и отслеживать статус вашего обращения в личном кабинете, пожалуйста, войдите в аккаунт — это займёт всего пару минут.',
};

export const useAiChatWidget = () => {
  const { user, isLoading: isSessionLoading } = useUser();
  const chat = useAiChat();

  const isAuthorized = Boolean(user);
  const displayMessages = isAuthorized ? chat.messages : [GUEST_AUTH_MESSAGE];
  const isInputDisabled =
    chat.isStreaming ||
    chat.isLocked ||
    chat.isConfirmOpen ||
    !isAuthorized ||
    isSessionLoading;
  const showSuggestions =
    isAuthorized &&
    chat.suggestions.length > 0 &&
    !chat.isStreaming &&
    !chat.isTyping &&
    !chat.isLocked &&
    !chat.isConfirmOpen;
  const showTyping = chat.isTyping || isSessionLoading;
  const canSend = Boolean(chat.input.trim()) && !isInputDisabled;

  const inputPlaceholder = chat.isLocked
    ? 'Заявка на оплату создана'
    : !isAuthorized
      ? 'Войдите в аккаунт, чтобы начать консультацию...'
      : 'Опишите ситуацию...';

  const orderCreatedLabel = chat.orderId
    ? `Заявка на оплату создана № ${chat.orderId}.`
    : 'Заявка на оплату создана.';

  return {
    ...chat,
    isAuthorized,
    displayMessages,
    isInputDisabled,
    showSuggestions,
    showTyping,
    canSend,
    inputPlaceholder,
    orderCreatedLabel,
  };
};
