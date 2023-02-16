import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      newAvatarLink: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="edit-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonName="Сохранить"
    >
      <input
        ref={inputRef}
        className="popup__input"
        type="url"
        name="popup-new-avatar-link"
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup-new-avatar-link-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
