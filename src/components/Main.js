import React from 'react';
// import avatar from "../images/cousteau.jpg";
// import avatar from "../images/default-avatar.png";
// import './Main.css';
import Card from './Card';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


// const Chat = React.memo((props) => {
//   return (
//     <div className="chat">
//       <img src={`img/${props.id}.png`} width="75" />
//       <h2>{Math.random()}</h2>
//       <div className="date">{props.lastMessageAt}</div>
//     </div>
//   );
// });

function Main ({
    onAddPlace,
    onEditAvatar,
    onEditProfile,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
  }) {

  const currentUser = React.useContext(CurrentUserContext);

  // console.log(currentUser);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="profile__avatar-button"
          type="button"
          aria-label="Редактировать"
          onClick={onEditAvatar}
        >
          <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} ></div>
          {/* <img src={props.userAvatar} className="profile__avatar" alt="Аватар пользователя" /> */}
        </button>
        <div className="profile__info">
          <div className="profile__text">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {/* {props.children} */}
        {
          // В4.
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        }
      </section>
    </main>
  );
}

export default Main;
