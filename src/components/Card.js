import React from 'react';
// import './Card.css';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({
    card,
    onCardClick,
    onCardLike,
    onCardDelete,
  }) {

  const currentUser = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(card); // или props.onCardClick({ link, name })
  };

  const handleLikeClick = () => {
    onCardLike(card);
  };

  const handleDeleteClick = () => {
    // console.log('Удалить карточку:', card);
    onCardDelete(card);
  }

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в className для кнопки лайка
  const cardLikeButtonClassName = ( `element__like ${isLiked && 'element__like_active'}` );

  return (
    // <></>
    <article className="element">
      <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="element__caption">
        <h2 className="element__header">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} type="button" aria-label="Нравится" onClick={handleLikeClick}></button>
          <span className="element__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="element__delete" onClick={handleDeleteClick} type="button" aria-label="Удалить"></button>}
    </article>
  );
}

export default Card;
