function ImagePopup(props) {
  return (
    <div
      className={`popup popup-image popup_bkg-opacity ${
        props.card.link ? 'popup_opened' : ''
      }`}
    >
      <figure className="popup__figure">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <figcaption className="popup__caption">{props.card.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
