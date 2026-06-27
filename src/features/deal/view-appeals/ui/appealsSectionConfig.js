export const APPEALS_SECTION_VARIANTS = {
  active: {
    title: "Мои обращения",
    emptyTitle: "Пока нет обращений",
    emptyDescription:
      "Опишите ситуацию интеллектуальному помощнику на главной странице — он подготовит заявку на оплату",
    emptySubtitle:
      "Обращения появятся здесь после оплаты заявки из интеллектуального помощника",
    showCreateButton: true,
    closed: false,
  },
  completed: {
    title: "Завершенные обращения",
    emptyTitle: "Нет завершенных обращений",
    emptyDescription:
      "Здесь появятся обращения, которые юрист закрыл после оказания услуги",
    emptySubtitle: "Завершенные обращения отображаются после закрытия в работе",
    showCreateButton: false,
    closed: true,
  },
};
