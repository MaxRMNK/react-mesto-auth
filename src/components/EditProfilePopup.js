// import './EditProfilePopup.css';
import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading, onOverlay}) {

  const currentUser = React.useContext(CurrentUserContext);
  // console.log(currentUser);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  // console.log(currentUser.name);
  // const [value, setValue] = React.useState(currentUser);

  function handleNameChange(e) {
    setName(e.target.value);
    // console.log(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }




  return (
    <PopupWithForm
      title='Редактировать профиль'
      name='edit-profile'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      isLoading={isLoading}
      onOverlay={onOverlay}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        id="input-name"
        name="editName"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={handleNameChange}
        />
      <span className="popup__error input-name-error"></span>
      <input
        type="text"
        className="popup__input popup__input_type_job"
        id="input-job"
        name="editJob"
        placeholder="Профессия"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={handleDescriptionChange}
        />
      <span className="popup__error input-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
