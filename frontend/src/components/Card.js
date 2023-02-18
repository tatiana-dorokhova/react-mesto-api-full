import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = (props.card.owner === currentUser._id || props.card.owner._id === currentUser._id);
  const cardDeleteButtonClassName = `element__delete${
    isOwn ? "" : " element__delete_hidden"
  }`;

  console.log('isOwn = ', isOwn);

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like${
    isLiked ? " element__like_marked" : ""
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="element">
      <img
        className="element__image"
        src={props.card.link}
        alt={props.card.name}
        onClick={handleClick}
      />
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
      <div className="element__info">
        <h2 className="element__name">{props.card.name}</h2>
        <div className="element__likes-area">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="element__likes-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
