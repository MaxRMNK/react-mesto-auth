// import defaultImage from "../images/default.jpg";
/**
 * Для картинок можно сделать проверку ссылки является ли она ссылкой на картинку (с помощью includes
 * проверять вхождение расширений, или через рег.выражение).
 * Если ссылка на картинку нерабочая - выводить дефолтное изображение {card ? card.link : defaultImage}
 */


// Попап картинки
function ImagePopup({ card, onClose, onOverlay }) {

  return (

    <div className={`popup popup_image ${card && 'popup_is-opened'}`} onClick={onOverlay}>
      <div className="popup__container popup__container_image">
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <figure className="popup__illustration">
          <img className="popup__large-image" src={card?.link} alt={card?.name} />
          <figcaption className="popup__caption-image">{card?.name}</figcaption>
        </figure>
      </div>
    </div>

  );
}

export default ImagePopup;
