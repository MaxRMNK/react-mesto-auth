// import './PopupWithForm.css';

// Попап редактирования Аватара
// Попап редактирования имени и профессии
// Попап добавления карточки
// Попап подтверждения (удаления)
function PopupWithForm({
    isOpen,
    onClose,
    onSubmit,
    name,
    title,
    buttonText,
    children,
    isLoading,
    onOverlay,
  }) {
  // console.log('PopupWithForm', props);

  // if (isOpen) {debugger;}

  return (
  <>
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_is-opened' : ''}`} onClick={onOverlay}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <h3 className="popup__header">{title}</h3>
        <form action="#" className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className={`popup__button ${isLoading && 'popup__button_disabled'}`} type="submit" disabled={isLoading}>{buttonText}</button>
        </form>
      </div>
    </div>



    {/* Это мне еще пригодится, пока не удаляю

    <div className="popup popup_edit-avatar">
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        <h3 className="popup__header">Обновить аватар</h3>
        <form action="#" className="popup__form popup__form_edit-avatar" name="editAvatarForm" noValidate>
          <input
            type="url"
            className="popup__input popup__input_type_avatar"
            id="input-avatar"
            name="editAvatar"
            placeholder="Ссылка на картинку"
            required />
          <span className="popup__error input-avatar-error"></span>
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <div className="popup popup_edit-profile">
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        <h3 className="popup__header">Редактировать профиль</h3>
        <form action="#" className="popup__form popup__form_edit-profile" name="editProfileForm" noValidate>
          <input
            type="text"
            className="popup__input popup__input_type_name"
            id="input-name"
            name="editName"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required />
          <span className="popup__error input-name-error"></span>
          <input
            type="text"
            className="popup__input popup__input_type_job"
            id="input-job"
            name="editJob"
            placeholder="Профессия"
            minLength="2"
            maxLength="200"
            required />
          <span className="popup__error input-job-error"></span>

          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <div className="popup popup_add-card">
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        <h3 className="popup__header">Новое место</h3>
        <form action="#" className="popup__form popup__form-add-card" name="addCardForm">
          <input
            type="text"
            className="popup__input popup__input_type_add-title"
            id="input-add-title"
            name="addCardTitle"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required />
          <span className="popup__error input-add-title-error"></span>
          <input
            type="url"
            className="popup__input popup__input_type_add-link"
            id="input-add-link"
            name="addCardLink"
            placeholder="Ссылка на картинку"
            required />
          <span className="popup__error input-add-link-error"></span>
          <button className="popup__button" type="submit">Сохранить</button>
        </form>
      </div>
    </div>

    <div className="popup popup_confirm">
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть"></button>
        <h3 className="popup__header">Вы уверены?</h3>
        <form action="#" className="popup__form popup__form-confirm" name="confirmForm">
          <button className="popup__button" type="submit">Да</button>
        </form>
      </div>
    </div> */}

  </>
  );
}

export default PopupWithForm;
