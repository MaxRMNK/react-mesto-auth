// import './AddPlacePopup.css';
import React from "react";
import PopupWithForm from "./PopupWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";
// import { useForm } from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading, onOverlay }) { //, buttonText
  // const currentUser = React.useContext(CurrentUserContext);

  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  // Очистка полей ввода при открытии и закрытии popup (при изменении isOpen)
  React.useEffect(() => {
    setTitle('');
    setLink('');
  }, [isOpen]);

  function handleNewCardTitle(e) {
    setTitle(e.target.value);
  }

  function handleNewCardLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name: title,
      link: link,
    });
  }


  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isLoading={isLoading}
      onOverlay={onOverlay}
    >
      <input
        type="text"
        className="popup__input popup__input_type_add-title"
        id="input-add-title"
        name="addCardTitle"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
        value={title}
        onChange={handleNewCardTitle}
      />
      <span className="popup__error input-add-title-error"></span>
      <input
        type="url"
        className="popup__input popup__input_type_add-link"
        id="input-add-link"
        name="addCardLink"
        placeholder="Ссылка на картинку"
        required
        value={link}
        onChange={handleNewCardLink}
      />
      <span className="popup__error input-add-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
