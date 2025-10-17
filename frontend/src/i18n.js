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

      header: {
        logout: 'Выйти',
      },

      login: {
        noAccount: 'Нет аккаунта? ',
        signupLink: 'Регистрация',
      },

      signup: {
        header: 'Регистрация',
        username: 'Имя пользователя',
        password: 'Пароль',
        confirmPassword: 'Подтвердите пароль',
        submit: 'Зарегистрироваться',
      },

      validation: {
        required: 'Обязательное поле',
        channelMin: 'От 3 до 20 символов',
        channelMax: 'От 3 до 20 символов',
        channelUnique: 'Такой канал уже существует',
        channelName: 'Имя канала',
        channelNamePlaceholder: 'Введите имя канала',
        networkError: 'Ошибка сети. Попробуйте еще раз.',
        usernameMinMax: 'От 3 до 20 символов',
        passwordMin: 'Не менее 6 символов',
        passwordMatch: 'Пароли должны совпадать',
        userExists: 'Такой пользователь уже существует',
      },

      notifications: {
        channel_removed: 'Канал успешно удалён',
        channel_added: 'Канал успешно создан',
        channel_renamed: 'Канал успешно переименован',
        network_error: 'Ошибка сети. Попробуйте позже',
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
