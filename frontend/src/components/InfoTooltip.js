function InfoTooltip(props) {
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
        <img
          src={props.isAuthSuccess ? props.authOkImage : props.authFailImage}
          alt="props.name"
          className="popup__notification-image"
        />
        <p className="popup__notification">
          {props.isAuthSuccess
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;
