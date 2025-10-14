import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ru: {
    translation: {
      modals: {
        addChannel: 'Добавить канал',
        renameChannel: 'Переименовать канал',
        removeChannel: 'Удалить канал',
        removeConfirmation: 'Вы уверены, что хотите удалить канал',
        cancel: 'Отмена',
        submit: 'Отправить',
        renaming: 'Переименование...',
        removing: 'Удаление...',
      },
      validation: {
        required: 'Обязательное поле',
        channelMin: 'От 3 до 20 символов',
        channelMax: 'От 3 до 20 символов',
        channelUnique: 'Такой канал уже существует',
        channelName: 'Имя канала',
        channelNamePlaceholder: 'Введите имя канала',
        networkError: 'Ошибка сети. Попробуйте еще раз.',
      },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;