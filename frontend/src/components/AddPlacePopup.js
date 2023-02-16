import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [values, setValues] = React.useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      newCardName: values['popup-new-card-name'],
      newCardLink: values['popup-new-card-link'],
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setValues({});
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      submitButtonName="Создать"
    >
      <input
        className="popup__input"
        type="text"
        name="popup-new-card-name"
        value={values['popup-new-card-name'] ?? ''}
        onChange={handleChange}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span className="popup__error popup-new-card-name-error"></span>
      <input
        className="popup__input"
        type="url"
        name="popup-new-card-link"
        value={values['popup-new-card-link'] ?? ''}
        onChange={handleChange}
        placeholder="Ссылка на картинку"
        required
      />
      <span className="popup__error popup-new-card-link-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
