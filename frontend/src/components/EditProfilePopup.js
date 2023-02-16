import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      newUserName: name,
      newUserAbout: description,
    });
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonName="Сохранить"
    >
      <input
        className="popup__input"
        type="text"
        value={name ?? ''}
        onChange={handleNameChange}
        name="popup-profile-name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span className="popup__error popup-profile-name-error"></span>
      <input
        className="popup__input"
        type="text"
        value={description ?? ''}
        onChange={handleDescriptionChange}
        name="popup-profile-job"
        placeholder="Род занятий"
        minLength="2"
        maxLength="200"
        required
      />
      <span className="popup__error popup-profile-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
