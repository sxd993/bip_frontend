export const servicePrivateData = {
  physical: {
    title: 'Услуги для частных лиц',
    services: [
      {
        id: 1,
        position: 1,
        name: 'Семейное право',
        subServices: [
          { id: 1, name: 'Развод', description: 'Юридическое сопровождение процедуры расторжения брака' },
          { id: 2, name: 'Раздел имущества', description: 'Споры о разделе совместно нажитого имущества' },
          { id: 3, name: 'Алименты', description: 'Взыскание и оспаривание алиментных обязательств' }
        ]
      },
      {
        id: 2,
        position: 2,
        name: 'Жилищное право',
        subServices: [
          { id: 4, name: 'Приватизация', description: 'Оформление приватизации жилых помещений' },
          { id: 5, name: 'Выселение', description: 'Защита от незаконного выселения' }
        ]
      },
      {
        id: 3,
        position: 3,
        name: 'Наследственное право',
        subServices: [
          { id: 6, name: 'Вступление в наследство', description: 'Оформление наследственных прав' },
          { id: 7, name: 'Споры о наследстве', description: 'Разрешение наследственных споров' }
        ]
      }
    ]
  }
};