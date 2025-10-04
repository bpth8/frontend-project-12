const ru = {
  translation: {
    loginPage: {
      question: 'Нет аккаунта? ',
      registration: 'Регистрация',
    },
    notFoundPage: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    channelTitle: {
      title: 'Каналы',
      addButton: '+',
    },
    dropdownButton: {
      description: 'Управление каналом',
      removeButton: 'Удалить',
      renameButton: 'Переименовать',
    },
    messagesContainer: {
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },
    messagasForm: {
      label: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      submitButton: 'Отправить',
    },
    modal: {
      label: 'Имя канала',
      add: {
        title: 'Добавить канал',
        closeButton: 'Отменить',
        submitButton: 'Отправить',
      },
      remove: {
        title: 'Удалить канал',
        question: 'Уверены?',
        closeButton: 'Отменить',
        removeButton: 'Удалить',
      },
      rename: {
        title: 'Переименовать канал',
        closeButton: 'Отменить',
        submitButton: 'Отправить',
      },
      validation: {
        notOneOf: 'Должно быть уникальным',
        range: 'От 3 до 20 символов',
        required: 'Обязательное поле',
      },
    },
    image: {
      login: 'Приветственное изображение при входе в чат',
      signup: 'Изображение при регистрации',
      NotFound: '404 Данной страницы не существует',
    },
    loading: {
      text: 'Загрузка...',
    },
    loginForm: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      buttonSubmit: 'Войти',
      feedback: 'Неверные имя пользователя или пароль',
    },
    mainLayout: {
      title: 'Hexlet Chat',
      exitButton: 'Выйти',
    },
    registrationForm: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
      errors: {
        usernameRange: 'От 3 до 20 символов',
        usernameExist: 'Такой пользователь уже существует',
        passwordRange: 'Не менее 6 символов',
        passwordConfirm: 'Пароли должны совпадать',
        required: 'Обязательное поле',
      },
    },
    toastify: {
      success: {
        add: 'Канал создан',
        rename: 'Канал переименован',
        remove: 'Канал удалён',
      },
      error: {
        error: 'Ошибка',
        connectionError: 'Ошибка соединения',
        authError: 'Ошибка авторизации',
      },
    },
  },
};

export default { ru };
