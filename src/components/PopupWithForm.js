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
  );
}

export default PopupWithForm;
