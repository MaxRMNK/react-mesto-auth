function InfoTooltip({isInfoTooltipOpen, isSuccessAuth, onClose, onOverlay}) {

  let message = isSuccessAuth ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (

    <div className={`popup popup_info ${isInfoTooltipOpen && 'popup_is-opened'}`} onClick={onOverlay}>
      <div className="popup__container">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <div className={`popup__tooltip ${ isSuccessAuth ? 'popup__tooltip_succeed' : 'popup__tooltip_fail' }`}>{message}</div>
      </div>
    </div>

  );
}

export default InfoTooltip;


// let message = '';
// if (isSuccessAuth) {
//   message = 'Вы успешно зарегистрировались!';
// } else {
//   message = 'Что-то пошло не так! Попробуйте ещё раз.';
// }


//     <div className='popup popup_info popup_is-opened' onClick={onOverlay}>
