// import './EditAvatarPopup.css';
import React from 'react';
import PopupWithForm from "./PopupWithForm";
// import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading, onOverlay }) {

  // const currentUser = React.useContext(CurrentUserContext);

  const avatarRef = React.useRef();

  // Очистка полей ввода при открытии и закрытии popup (при изменении isOpen)
  React.useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      /* Значение инпута, полученное с помощью рефа */
      avatar: avatarRef.current.value,
    });
  }


  return (
    <PopupWithForm
      title='Обновить аватар'
      name='edit-avatar'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isLoading={isLoading}
      onOverlay={onOverlay}
    >
      <input
        type="url"
        className="popup__input popup__input_type_avatar"
        id="input-avatar"
        name="editAvatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="popup__error input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
