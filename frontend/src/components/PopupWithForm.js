function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
    >
      <div className="popup__container section">
        <button
          className="popup__close-button"
          type="button"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__form"
          name={`form_${props.name}`}
          onSubmit={props.onSubmit}
          action="#"
        >
          {props.children}
          <button className="popup__submit-button" type="submit">
            {props.submitButtonName}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
