import React from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import Footer from "./Footer";
import InfoTooltip from "./InfoTooltip";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import ImagePopup from "./ImagePopup";

import { api } from "../utils/api";
import * as auth from "../utils/auth";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import ProtectedRouteElement from "./ProtectedRoute";

import defaultAvatar from "../images/default-avatar.png";

const defaultUserInfo = {
  name: "Жак-Ив Кусто",
  about: "Исследователь океана",
  avatar: defaultAvatar,
};

function App() {

  // Стейт данных пользователя.
  const [currentUser, setCurrentUser] = React.useState(defaultUserInfo); // раньше: userInfo

  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false); // Стейт надписи на кнопке popup

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = React.useState(false);
  const [cardDelete, setCardDelete] = React.useState(null);

  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false); // Попап с сообщением, открыт/закрыт
  const [isSuccessAuth, setSuccessAuth] = React.useState(false);

  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});


  // Регистрация и авторизация
  // const [valueRegister, setValueRegister] = React.useState({ email: '', password: '' });
  // const [valueLogin, setValueLogin] = React.useState({ email: '', password: '' });

  const navigate = useNavigate();

  // Проверка токена
  function checkAuth() {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth.checkToken(token)
      .then((res) => {
        // console.log(res.data);
        setLoggedIn(true);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
    }
  }

  // Регистрация
  function handleRegister(value) {
    setIsLoading(true);
    auth.register(value.email, value.password)
    .then((res) => {
      setSuccessAuth(true);
      navigate('/sign-up', { replace: true });
    })
    .catch((err) => {
      setSuccessAuth(false);
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      setIsLoading(false);
      setInfoTooltipOpen(true);
    })
  }

  // Авторизация
  function handleLogin(value) {
    setIsLoading(true);
    auth.login(value.email, value.password)
    .then((data) => {
      if(data.token) {
        localStorage.setItem('jwt', data.token);
        // checkAuth(); // было. 97 строка + коммент ниже + коммент
        /**
         * Здесь избыточно проверять авторизацию, так как вы только что получили токен
         * и можете считать его в данный момент валидным в рамках сессии авторизации.
         * Здесь вместо проверки токена следует установить значение переменной isLoggedIn
         * как true - ваша форма после этого будет работать корректно.
         * --
         * Тупанул. Почему-то решил, что сделав проверку checkAuth() получу сразу true,
         * а скрипт не успев получить ответ идет дальше
         */
        setLoggedIn(true); // стало
        navigate('/', { replace: true });
      }
    })
    .catch((err) => {
      setSuccessAuth(false);
      setInfoTooltipOpen(true);
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  // Выход
  function handleSignOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData({});
    navigate('/sign-up', { replace: true });
  }


  React.useEffect(() => {
    checkAuth();
  }, []);


  // Загрузка с сервера данных карточек и профиля пользователя
  React.useEffect(() => {
    if(isLoggedIn) {
      api
      .getAllPageData()
      .then((result) => {
        setCurrentUser(result[0]); // apiUser
        setCards(result[1]); // apiCards
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });

      // // Это нужно для того, чтобы при отправке данных формы "вход" переадресация осуществлялась корректно.
      // // Без этой строки, переадресация на страницу с карточками происходит только после повторной отправки формы.
      // // Как решить проблему по-другому не знаю.
      // navigate('/', { replace: true });
      /**
       * Это происходит из за того, что вы после авторизации не меняете значение переменной isLoggedIn,
       * а вызываете проверку токена, которая по сути избыточна сразу после авторизации. См. комментарий на 97 строке.
       */
    }
  }, [isLoggedIn]);
  // Второй аргумент - [] - массив зависимостей. Если значения прописанные в этом массиве изменились,
  // тогда этот эффект будет выполняться. Если нет - логика внутри useEffect вызываться не будет.
  // Если массив пустой - эффект выполняется только один раз при загрузке страницы.
  // Узнать: Можно ли в качестве зависимости указать функцию?


  // Эффект для закрытия popup кнопкой Esc
  React.useEffect(() => {
    // Указывать функции внутри безопаснее:
    // https://ru.legacy.reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
    // У меня здесь нет ничего важного, поэтому можно было и вынести за пределы эффекта.
    function closeOnEsc(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    // Если одна из переменных true идем дальше, иначе работа эффекта останавливается до повторного запуска
    if (
      !isEditAvatarPopupOpen &&
      !isEditProfilePopupOpen &&
      !isAddPlacePopupOpen &&
      !selectedCard &&
      !isConfirmDeletePopupOpen &&
      !isInfoTooltipOpen
    )
    return;

    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    isConfirmDeletePopupOpen,
    isInfoTooltipOpen,
  ]);

  // Обработчик клика по оверлею
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    // const popupElement = document.querySelector('.popup_add-card');
    // popupElement.classList.add('popup_is-opened');
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    isEditAvatarPopupOpen && setIsEditAvatarPopupOpen(false);
    isEditProfilePopupOpen && setIsEditProfilePopupOpen(false);
    isAddPlacePopupOpen && setIsAddPlacePopupOpen(false);
    selectedCard && setSelectedCard(null);
    isConfirmDeletePopupOpen && setIsConfirmDeletePopupOpen(false);
    isInfoTooltipOpen && setInfoTooltipOpen(false)
    // cardDelete && setCardDelete(null);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }

  // Удаление карточки: popup подтверждение удаления.
  // Код из задания ПР11 перенес в handleCardDeleteConfirm
  function handleCardDelete(card) {
    setCardDelete(card);
    setIsConfirmDeletePopupOpen(true);
    // useState (setCardDelete()) - асинхронная функция. Поэтому здесь выводится обнуленное значение (null),
    // которое было записано по-умолчанию или в handleCardDeleteConfirm
    // console.log(cardDelete);
  }

  // Удаление после подтверждения
  function handleCardDeleteConfirm() {
    setIsLoading(true);
    api
      .deleteCard(cardDelete._id)
      .then(() => {
        // обновите стейт cards с помощью метода filter: создайте копию массива, исключив из него удалённую карточку
        const newCards = cards.filter((item) => {
          return item._id !== cardDelete._id;
        });
        setCards(newCards);
        setCardDelete(null);
        closeAllPopups();
        // см. выше:  useState (setCardDelete()) - асинхронная функция.
        // Здесь выводится НЕобнуленное значение, записанное ранее в handleCardDelete.
        // console.log(cardDelete);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(userInfo) {
    setIsLoading(true);
    api
      .setUserInfo(userInfo.name, userInfo.about)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          name: userInfo.name,
          about: userInfo.about,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(userAvatar) {
    // console.log(userAvatar);
    setIsLoading(true);
    api
      .setAvatar(userAvatar.avatar)
      .then(() => {
        setCurrentUser({
          ...currentUser,
          avatar: userAvatar.avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(inputData) {
    setIsLoading(true);
    api
      .addCardInDb(inputData)
      // Затем, если предыдущая операция была успешной, обновляется информация на странице
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })
      .finally(() => {
        setIsLoading(false);
      });
  }



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        onSignOut={handleSignOut}
        isLoggedIn={isLoggedIn}
        userData={userData}
      />

      <Routes>
        <Route
          path="/"
          element={<ProtectedRouteElement
            element={Main}
            isLoggedIn={isLoggedIn}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            cards={cards}
            onCardClick={setSelectedCard}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />} />
        <Route path="/sign-up" element={<Login
          onLogin={handleLogin}
          isLoading={isLoading}
          />} />
        <Route path="/sign-in" element={<Register
          onRegister={handleRegister}
          isLoading={isLoading}
          />} />
        <Route path="*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-up" replace />} />
      </Routes>


      <Routes>
        <Route path="/" element={ <Footer /> } />
      </Routes>


      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        isLoading={isLoading}
        onOverlay={handleOverlayClick}
      />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        isLoading={isLoading}
        onOverlay={handleOverlayClick}
      />

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        isLoading={isLoading}
        onOverlay={handleOverlayClick}
      />

      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDeleteConfirm={handleCardDeleteConfirm}
        // card={card}
        isLoading={isLoading}
        onOverlay={handleOverlayClick}
      />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        onOverlay={handleOverlayClick}
      />

      <InfoTooltip
        isInfoTooltipOpen={isInfoTooltipOpen}
        isSuccessAuth={isSuccessAuth}
        onClose={closeAllPopups}
        onOverlay={handleOverlayClick}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;

/*

<React.Fragment></React.Fragment> = <></>

*/
