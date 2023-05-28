// import './InfoTooltip.css';

function InfoTooltip({isInfoTooltipOpen, isSuccessAuth, onClose, onOverlay}) {

  let message = '';

  if (isSuccessAuth) {
    message = 'Вы успешно зарегистрировались!';
  } else {
    message = 'Что-то пошло не так! Попробуйте ещё раз.';
  }


  return (

    <div className={`popup popup_info ${isInfoTooltipOpen && 'popup_is-opened'}`} onClick={onOverlay}>
      <div className="popup__container popup__container_info">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <div className={`info-tooltip ${ isSuccessAuth ? 'info-tooltip__succeed' : 'info-tooltip__fail' }`}>{message}</div>
      </div>
    </div>

  );
}

export default InfoTooltip;

//     <div className='popup popup_info popup_is-opened' onClick={onOverlay}>
