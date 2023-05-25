import React from "react";
// import { useState, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
// import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeletePopup from "./ConfirmDeletePopup";

import ImagePopup from "./ImagePopup";
// import Card from './Card';
import { api } from "../utils/Api";
import defaultAvatar from "../images/default-avatar.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const defaultUserInfo = {
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: defaultAvatar,
  };
  // Стейт данных пользователя.
  // setcurrentUser следит за состоянием "объекта", и при его изменении перезаписывает currentUser (раньше - userInfo)
  const [currentUser, setCurrentUser] = React.useState(defaultUserInfo);
  // const [currentUser, setCurrentUser] = React.useState({ name: 'Жак-Ив Кусто', about: 'Исследователь океана', avatar: defaultAvatar });
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false); // Стейт надписи на кнопке popup

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] =
    React.useState(false);
  const [cardDelete, setCardDelete] = React.useState(null);

  // Загрузка с сервера данных карточек и профиля пользователя
  React.useEffect(() => {
    api
      .getAllPageData()
      .then((result) => {
        // console.log(result);
        const [apiUser, apiCards] = result;
        setCurrentUser(apiUser);
        setCards(apiCards);
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  }, []);
  // Второй аргумент - [] - массив зависимостей. Если значения прописанные в этом массиве изменились,
  // тогда этот эффект будет выполняться. Если нет - логика внутри useEffect вызываться не будет.

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
      !isConfirmDeletePopupOpen
    )
      return;

    document.addEventListener("keydown", closeOnEsc);

    return () => {
      document.removeEventListener("keydown", closeOnEsc);
    };
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
    isConfirmDeletePopupOpen,
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
    // console.log('111');
    setCardDelete(card);
    setIsConfirmDeletePopupOpen(true);
    // useState (setCardDelete()) - асинхронная функция. Поэтому здесь выводится обнуленное значение (null),
    // которое было записано по-умолчанию или в handleCardDeleteConfirm
    // console.log(cardDelete);
  }

  // Удаление после подтверждения
  function handleCardDeleteConfirm() {
    // console.log('222');
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
    // console.log(userInfo);
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
      <Header />

      <Routes>
        <Route
          path="*" // path="/"
          element={
            <Main
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              cards={cards}
              onCardClick={setSelectedCard}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          }
        />
        <Route path="/sign-up" element={""} />
        <Route path="/sign-in" element={""} />
      </Routes>

      {/* <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        cards={cards}
        onCardClick={setSelectedCard}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      /> */}

      <Footer />

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
    </CurrentUserContext.Provider>
  );
}

export default App;
